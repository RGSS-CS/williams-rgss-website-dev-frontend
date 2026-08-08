"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import styles from "@/app/(public)/_styles/sections/school-map.module.css";
import type { SchoolLocation } from "@/app/_lib/site-management";

type SchoolMapProps = {
    locations: SchoolLocation[] | null;
    /** Zoom level to use when a single location is shown. Ignored for multiple locations (bounds fit instead). */
    zoom?: number;
    className?: string;
};

const DEFAULT_ZOOM = 16;

export default function SchoolMap({
    locations,
    zoom = DEFAULT_ZOOM,
    className,
}: SchoolMapProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<LeafletMap | null>(null);
    const markersRef = useRef<LeafletMarker[]>([]);

    const validLocations = (locations ?? []).filter(
        (loc) =>
            typeof loc.locationLat === "number" &&
            typeof loc.locationLon === "number" &&
            !Number.isNaN(loc.locationLat) &&
            !Number.isNaN(loc.locationLon)
    );

    useEffect(() => {
        if (!containerRef.current || validLocations.length === 0) {
            return;
        }

        let cancelled = false;

        (async () => {
            const L = (await import("leaflet")).default;
            await import("leaflet/dist/leaflet.css");

            if (cancelled || !containerRef.current) {
                return;
            }

            // Fix default marker icon paths, which Leaflet resolves relative to the
            // page URL by default and breaks under Next.js/webpack bundling.
            const resolveAssetUrl = (mod: { default: unknown }): string => {
                const asset = mod.default;
                // Next.js's static asset loader wraps imported images in an object
                // ({ src, width, height }); a plain string means the raw URL was returned.
                if (typeof asset === "string") {
                    return asset;
                }
                return (asset as { src: string }).src;
            };

            const iconRetinaUrl = resolveAssetUrl(await import("leaflet/dist/images/marker-icon-2x.png"));
            const iconUrl = resolveAssetUrl(await import("leaflet/dist/images/marker-icon.png"));
            const shadowUrl = resolveAssetUrl(await import("leaflet/dist/images/marker-shadow.png"));

            delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl,
                iconUrl,
                shadowUrl,
            });

            // Reuse an existing map instance on re-render instead of recreating it.
            if (!mapRef.current) {
                mapRef.current = L.map(containerRef.current, {
                    scrollWheelZoom: false,
                });
            }
            const map = mapRef.current;

            // Clear previous markers before redrawing.
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];

            const tileLayer = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 19,
                }
            );
            tileLayer.addTo(map);

            const bounds = L.latLngBounds(
                validLocations.map((loc) => [loc.locationLat, loc.locationLon])
            );

            validLocations.forEach((loc) => {
                const marker = L.marker([loc.locationLat, loc.locationLon]);
                if (loc.location) {
                    // Popup: full address, shown on click/tap.
                    marker.bindPopup(loc.location);
                    // Tooltip: shorter permanent label so the address is visible
                    // without needing to interact with the marker.
                    marker.bindTooltip(loc.location, {
                        permanent: true,
                        direction: "top",
                        offset: [0, -8],
                        className: styles.mapTooltip,
                    });
                }
                marker.addTo(map);
                markersRef.current.push(marker);
            });

            // For a single location, open the popup by default so the address
            // is immediately visible rather than requiring a click.
            if (validLocations.length === 1) {
                markersRef.current[0]?.openPopup();
            }

            if (validLocations.length === 1) {
                map.setView(bounds.getCenter(), zoom);
            } else {
                map.fitBounds(bounds, { padding: [32, 32] });
            }

            // Leaflet needs an explicit size recalculation once the container is
            // guaranteed to be laid out (e.g. after fonts/images shift layout).
            requestAnimationFrame(() => map.invalidateSize());
        })();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(validLocations), zoom]);

    useEffect(() => {
        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
            markersRef.current = [];
        };
    }, []);

    const primaryAddress = validLocations[0]?.location ?? null;

    if (validLocations.length === 0) {
        return null;
    }

    return (
        <div className={styles.schoolMapWrap}>
            <div
                ref={containerRef}
                className={`${styles.schoolMap} ${className ?? ""}`}
                role="img"
                aria-label={
                    primaryAddress
                        ? `Map showing the school location at ${primaryAddress}`
                        : "Map showing the school location"
                }
            />
            {validLocations.length > 1 && (
                <ul className={styles.schoolMapAddressList}>
                    {validLocations.map((loc, i) => (
                        <li key={`${loc.locationLat}-${loc.locationLon}-${i}`}>
                            {loc.location}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
