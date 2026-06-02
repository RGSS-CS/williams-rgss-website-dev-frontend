import styles from './about.module.css';

export default function AboutPage() {
    return (
        <main>
            <div className="hero">
                <div className="hero_shape"></div>
                <div className="hero_inner">
                    <div className="hero_left">
                        <div className="hero_title">
                            <h1>About Dr. GW Williams</h1>
                            <h2>STUCO</h2>
                        </div>
                        <div className="hero_subtitle">
                            <h5>Welcome to the heart of student leadership at Dr. GW Williams Secondary School.</h5>
                            <h5>Our Student Council (STUCO) is dedicated to fostering a vibrant school community through leadership, service, and school spirit.</h5>
                            <h5>From organizing events to advocating for student needs, STUCO is here to make your high school experience unforgettable.</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <h3>Goals</h3>
                
            </div>
        </main>
    )
}