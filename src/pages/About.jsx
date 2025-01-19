export const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      bio: "Leading innovation since 2020",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      bio: "Technical expert with 15 years experience",
    },
    {
      name: "Mike Johnson",
      role: "Head of Design",
      bio: "Creating beautiful experiences",
    },
  ];

  return (
    <div className="mx-auto px-4 py-8 container">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl">About Us</h1>
        <p className="mx-auto max-w-2xl text-gray-600 text-xl">
          We&apos;re on a mission to transform the digital landscape through
          innovative solutions and cutting-edge technology.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 mb-12 p-8 rounded-lg">
        <h2 className="mb-4 font-semibold text-2xl">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          To provide exceptional value through technology solutions that empower
          businesses and individuals to achieve their full potential. We believe
          in creating sustainable, scalable, and user-friendly solutions that
          make a real difference.
        </p>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="mb-6 font-semibold text-2xl">Our Team</h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="mb-2 font-semibold text-xl">{member.name}</h3>
              <p className="mb-2 text-blue-600">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="mb-4 font-semibold text-2xl">Our Values</h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold text-lg">Innovation</h3>
            <p className="text-gray-700">
              Constantly pushing boundaries and embracing new technologies.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-lg">Excellence</h3>
            <p className="text-gray-700">
              Delivering high-quality solutions in everything we do.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-lg">Integrity</h3>
            <p className="text-gray-700">
              Building trust through honest and ethical practices.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-lg">Collaboration</h3>
            <p className="text-gray-700">
              Working together to achieve exceptional results.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
