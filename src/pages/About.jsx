import React from 'react';

export const About = () => {
    const teamMembers = [
        {
            name: 'John Doe',
            role: 'CEO & Founder',
            bio: 'Leading innovation since 2020'
        },
        {
            name: 'Jane Smith',
            role: 'CTO',
            bio: 'Technical expert with 15 years experience'
        },
        {
            name: 'Mike Johnson',
            role: 'Head of Design',
            bio: 'Creating beautiful experiences'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    We're on a mission to transform the digital landscape through innovative solutions
                    and cutting-edge technology.
                </p>
            </section>

            {/* Mission Section */}
            <section className="mb-12 bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                    To provide exceptional value through technology solutions that empower businesses
                    and individuals to achieve their full potential. We believe in creating sustainable,
                    scalable, and user-friendly solutions that make a real difference.
                </p>
            </section>

            {/* Team Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                            <p className="text-blue-600 mb-2">{member.role}</p>
                            <p className="text-gray-600">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                        <p className="text-gray-700">Constantly pushing boundaries and embracing new technologies.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Excellence</h3>
                        <p className="text-gray-700">Delivering high-quality solutions in everything we do.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Integrity</h3>
                        <p className="text-gray-700">Building trust through honest and ethical practices.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Collaboration</h3>
                        <p className="text-gray-700">Working together to achieve exceptional results.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
