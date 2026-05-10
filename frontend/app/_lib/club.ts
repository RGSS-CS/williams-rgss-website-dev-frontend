async function getClubs() {
    const res = await fetch(
       "http://backend:8000/" /**TBD URL to REST API*/,
        {
            next: {
                revalidate: 60
            }
        }
    )

    return res.json()
};