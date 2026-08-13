import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Team A',
}

const teamMembers = [
  {
    name: 'Joash Koh Pang Jien',
    initials: 'JK',
    role: 'Project Manager',
    blurb:
      'Coordinates the team, manages project progress, and supports communication between team members and stakeholders.',
  },
  {
    name: 'Mahhe Abdulahi',
    initials: 'MA',
    role: 'Business Analyst',
    blurb:
      'Analyses client requirements and translates business needs into clear and practical project requirements.',
  },
  {
    name: 'Jinghao Shi',
    initials: 'JS',
    role: 'UX Designer',
    blurb:
      'Creates clear and consistent user experiences, prepares interface designs, and supports frontend development.',
  },
  {
    name: 'Poh Yin Chong',
    initials: 'PC',
    role: 'Developer',
    blurb:
      'Implements application features and supports technical development, testing, and project integration.',
  },
]

export default function TeamPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <section className="mb-10 rounded-2xl bg-slate-900 px-6 py-10 text-center text-white shadow-sm sm:px-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
          Meet our team
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Team A
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
          We are a collaborative four-person team combining project
          management, business analysis, user experience design, and software
          development skills.
        </p>
      </section>

      <section aria-labelledby="team-members-heading">
        <div className="mb-6">
          <h2
            id="team-members-heading"
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Team members
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Meet the people and roles supporting the project.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start gap-4">
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-800 dark:bg-teal-900 dark:text-teal-200"
                >
                  {member.initials}
                </div>

                <div className="min-w-0">
                  <h3 className="break-words text-xl font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h3>

                  <p className="mt-1 font-semibold text-teal-700 dark:text-teal-300">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-slate-200 dark:bg-slate-800" />

              <p className="break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
                {member.blurb}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Shared development contribution
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          As Team A has four members, responsibilities associated with the
          second developer role are shared across the team where required.
        </p>
      </section>
    </div>
  )
}