'use client'
import { filterCategory } from "@/app/(public)/_utils/filterCategory";
import { filterDay } from "@/app/(public)/_utils/filterCategory"

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
                Sports &amp; Recreation
            </button>
            <div className="filter_divider"></div>
            <button className="filter-chip" onClick={(e) => filterDay('Mon', e.currentTarget)}>Mon</button>
            <button className="filter-chip" onClick={(e) => filterDay('Tue', e.currentTarget)}>Tue</button>
            <button className="filter-chip" onClick={(e) => filterDay('Wed', e.currentTarget)}>Wed</button>
            <button className="filter-chip" onClick={(e) => filterDay('Thur', e.currentTarget)}>Thur</button>
            <button className="filter-chip" onClick={(e) => filterDay('Fri', e.currentTarget)}>Fri</button>
        </div>
    )
}