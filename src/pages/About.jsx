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
  ]

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">About Us</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-500 sm:text-2xl">
          We're on a mission to transform the digital landscape through innovative solutions and cutting-edge
          technology.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16 rounded-lg bg-gray-50 p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          To provide exceptional value through technology solutions that empower businesses and individuals to achieve
          their full potential. We believe in creating sustainable, scalable, and user-friendly solutions that make a
          real difference.
        </p>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">Our Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="mb-4 text-lg font-medium text-blue-600">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="rounded-lg bg-gray-50 p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">Our Values</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Innovation</h3>
            <p className="text-gray-700">Constantly pushing boundaries and embracing new technologies.</p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Excellence</h3>
            <p className="text-gray-700">Delivering high-quality solutions in everything we do.</p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Integrity</h3>
            <p className="text-gray-700">Building trust through honest and ethical practices.</p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Collaboration</h3>
            <p className="text-gray-700">Working together to achieve exceptional results.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

