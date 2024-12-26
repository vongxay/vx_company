import { useState, useEffect } from 'react';
import '../style/Teams.css';

const teamMembers = [
    {
        id: 1,
        name: "Lee",
        position: "CEO",
        description: "Mr. Lee leads the company's strategic vision and operations...",
        image: "/images/team-4.JPG"
    },
    {
        id: 2,
        name: "John",
        position: "VP of Sales & Marketing",
        description: "Mr. John oversees business development, management and marketing in the Asia Pacific region...",
        image: "/images/home-pic.png"
    },
 
];

function Teams() {
    const [currentMember, setCurrentMember] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isAnimating) {
                setIsAnimating(true);
                setCurrentMember((prev) => (prev + 1) % teamMembers.length);
                setTimeout(() => setIsAnimating(false), 500);
            }
        }, 5000);
        return () => clearInterval(timer);
    }, [isAnimating]);

    const nextMember = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentMember((prev) => (prev + 1) % teamMembers.length);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const prevMember = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    return (
        <section className="teams" id="teams">
            <div className="team-member">
                <div className={`team-content ${isAnimating ? 'fade' : ''}`}>
                    <h2 className="member-title">{teamMembers[currentMember].name}</h2>
                    <h3 className="member-position">{teamMembers[currentMember].position}</h3>
                    <p className="member-description">{teamMembers[currentMember].description}</p>
                </div>
                <div className={`team-image ${isAnimating ? 'slide' : ''}`}>
                    <img 
                        src={teamMembers[currentMember].image} 
                        alt={teamMembers[currentMember].name}
                        loading="lazy"
                    />
                </div>

                <div className="slide-arrows">
                    <button className="arrow-btn prev" onClick={prevMember}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="arrow-btn next" onClick={nextMember}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div className="team-navigation">
                {teamMembers.map((member, index) => (
                    <div 
                        key={member.id}
                        className={`team-nav-item ${currentMember === index ? 'active' : ''}`}
                        onClick={() => !isAnimating && setCurrentMember(index)}
                    >
                        <img src={member.image} alt={member.name} loading="lazy" />
                        <div className="nav-info">
                            <div className="member-name">{member.name}</div>
                            <div className="member-role">{member.position}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Teams;
