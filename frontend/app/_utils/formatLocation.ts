import type { Management } from "@/app/_lib/management";

type LocaProps = {
    management: Management | null;
}

export default function SchoolLocation({ management }: LocaProps){   
   
   const address = management?.schoolLocation?.[0]?.location;
    const mapsUrl = address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
        : null;
    const { displayAddress, regionLine } = address
        ? (() => {
            const parts = address.split(",").map(s => s.trim());
            const [name, houseNumber, street, city, region, , province, , country] = parts;
            const displayAddress = [name, [houseNumber, street].filter(Boolean).join(" ")]
                .filter(Boolean)
                .join(", ");
            const regionLine = [city, region, province, country].filter(Boolean).join(", ");
            return { displayAddress, regionLine };
        })()
        : { displayAddress: null, regionLine: null };

    return [mapsUrl, displayAddress, regionLine];
}