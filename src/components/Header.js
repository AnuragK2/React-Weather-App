import React from 'react'

const Header = ({ setQuery }) => {
    const cities = [
        {
            id: 1,
            title: 'Delhi'
        },
        {
            id: 2,
            title: 'Mumbai'
        },
        {
            id: 3,
            title: 'Bengaluru'
        },
        {
            id: 4,
            title: 'Kolkata'
        },
        {
            id: 5,
            title: 'Chennai'
        },
    ]

    return (
        <div className="flex items-center justify-between my-2">
            {cities.map((c) => (
                <button key={c.id} className="text-white text-sm font-medium hover:scale-110"
                    onClick={() => setQuery({ q: c.title })}><h1>{c.title}</h1></button>
            ))}
        </div>
    )
}

export default Header