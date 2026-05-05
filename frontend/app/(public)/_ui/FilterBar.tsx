'use client'
import { filterCategory } from "@/app/(public)/_utils/filterCategory";

export default function Filter() {
    return (
        <div className="filter_bar">
            <span className="filter_label">
                <i className="fas fa-filter"></i>
                Filter
            </span>
            <button className="filter-chip active gold" onClick={(e) => filterCategory('all', e.currentTarget)}>All Clubs</button>
            <button className="filter-chip" onClick={(e) => filterCategory('academic', e.currentTarget)}>
                <i className="fas fa-book"></i>
                Academic
            </button>
            <button className="filter-chip" onClick={(e) => filterCategory('arts', e.currentTarget)}>
                <i className="fas fa-palette"></i>
                Arts
            </button>
            <button className="filter-chip" onClick={(e) => filterCategory('community', e.currentTarget)}>
                <i className="fas fa-hands-helping"></i>
                Community
            </button>
            <button className="filter-chip" onClick={(e) => filterCategory('sports', e.currentTarget)}>
                <i className="fas fa-running"></i>
                Sports &amp; Rec
            </button>
            <button className="filter-chip" onClick={(e) => filterCategory('events', e.currentTarget)}>
                <i className="fas fa-running"></i>
                School Events
            </button>
            {/*Fix Server/Client components, refer: https://nextjs.org/docs/app/getting-started/server-and-client-components */}
        </div>
    )
}