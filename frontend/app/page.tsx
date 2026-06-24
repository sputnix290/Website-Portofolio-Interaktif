import {
  getProfile,
  getExperiences,
  getProjects,
  getCertifications,
  getSkills,
} from "../lib/api";
import Link from "next/link";

export default async function Home() {
  const [profileData, experiences, projects, certs, skillsData] =
    await Promise.all([
      getProfile(),
      getExperiences(),
      getProjects(),
      getCertifications(),
      getSkills(),
    ]);

  const rawProfile = profileData?.id
    ? profileData
    : profileData?.results
      ? profileData.results[0]
      : null;

  const profile = rawProfile || {
    nama: "Adrianus",
    bio_singkat: "Informatics Student",
    pendidikan_terakhir: "S1 Informatika",
    foto: "",
    cv_file: "",
  };

  const skillsList = skillsData?.results || skillsData || [];
  const languages = skillsList.filter((s: any) => s.kategori === "language");
  const frameworks = skillsList.filter((s: any) => s.kategori === "framework");
  const tools = skillsList.filter((s: any) => s.kategori === "tool");

  const projectList = projects?.results || projects || [];
  const certList = certs?.results || certs || [];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans antialiased scroll-smooth">
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/80 bg-[#020617]/70 backdrop-blur-md transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight font-mono group relative">
            <span className="text-blue-500 font-semibold">adrianus</span>
            <span className="text-slate-500 text-xs ml-1">.dev</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
          </div>

          <div className="hidden md:flex items-center gap-1">
            {[
              { id: "profile", label: "About" },
              { id: "experiences", label: "Experience" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "certifications", label: "Certificate" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800/50"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <section id="profile" className="py-20 border-b border-slate-800/50">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-mono text-blue-400 uppercase tracking-widest">
                  Welcome to Portofolio
                </p>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                  {profile.nama}
                </h1>
                <p className="text-xl text-slate-400">
                  {profile.pendidikan_terakhir || "S1 Informatika"}
                </p>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-line">
                {profile.bio_singkat ||
                  "Passionate developer crafting digital solutions"}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#contact"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm font-mono"
                >
                  Get In Touch
                </a>
                {profile.cv_file && (
                  <a
                    href={profile.cv_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-blue-500/30 text-blue-400 rounded-lg font-medium hover:bg-blue-500/10 transition-all text-sm font-mono"
                  >
                    Download CV
                  </a>
                )}
              </div>
            </div>

            {/* CONTAINER FOTO PROFIL: Diubah aspect ratio-nya agar sedikit lebih pendek */}
            <div className="relative aspect-[4/5] hidden md:block overflow-hidden rounded-2xl border border-slate-800 group bg-slate-900/20 shadow-2xl">
              {profile.foto ? (
                <img
                  src={profile.foto}
                  alt={profile.nama}
                  className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-all duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-transparent">
                  <div className="text-center space-y-2">
                    <div className="text-6xl font-bold text-blue-500/20 font-mono">
                      &lt;/&gt;
                    </div>
                    <p className="text-slate-500 text-xs font-mono">No Photo</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        <section
          id="experiences"
          className="py-20 border-b border-slate-800/50"
        >
          <div className="space-y-12">
            <div className="space-y-2">
              <p className="text-sm font-mono text-blue-400 uppercase tracking-widest">
                // Journey
              </p>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
                Experience
              </h2>
            </div>
            <div className="space-y-8 border-l-2 border-slate-800 pl-6">
              {experiences.map((exp: any) => (
                <div key={exp.id} className="relative group">
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></span>
                  <h3 className="text-xl font-bold text-white">
                    {exp.judul_kegiatan}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2">
                    {exp.penjelasan}
                  </p>
                  {/* <div className="mt-2 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                    <p className="text-xs text-blue-400 font-mono italic">
                      Pelajaran didapat: {exp.pelajaran_didapat}
                    </p>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 border-b border-slate-800/50">
          <div className="space-y-12">
            <div className="space-y-2">
              <p className="text-sm font-mono text-blue-400 uppercase tracking-widest">
                // Technical Stack
              </p>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
                Skills & Technologies
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-xl border border-slate-800 bg-gradient-to-br from-blue-500/10 via-slate-900/40 to-slate-950 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 group">
                <h3 className="text-lg font-bold mb-6 text-white group-hover:text-blue-400 transition-colors font-mono">
                  Languages
                </h3>
                <ul className="space-y-3">
                  {languages.map((skill: any) => (
                    <li
                      key={skill.id}
                      className="text-slate-400 text-sm flex items-center gap-3"
                    >
                      <span className="text-blue-500 font-bold text-lg leading-none">
                        •
                      </span>
                      <span>{skill.nama}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-xl border border-slate-800 bg-gradient-to-br from-emerald-500/10 via-slate-900/40 to-slate-950 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 group">
                <h3 className="text-lg font-bold mb-6 text-white group-hover:text-emerald-400 transition-colors font-mono">
                  Frameworks
                </h3>
                <ul className="space-y-3">
                  {frameworks.map((skill: any) => (
                    <li
                      key={skill.id}
                      className="text-slate-400 text-sm flex items-center gap-3"
                    >
                      <span className="text-emerald-500 font-bold text-lg leading-none">
                        •
                      </span>
                      <span>{skill.nama}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-xl border border-slate-800 bg-gradient-to-br from-purple-500/10 via-slate-900/40 to-slate-950 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300 group">
                <h3 className="text-lg font-bold mb-6 text-white font-mono">
                  Tools & Others
                </h3>
                <ul className="space-y-3">
                  {tools.map((skill: any) => (
                    <li
                      key={skill.id}
                      className="text-slate-400 text-sm flex items-center gap-3"
                    >
                      <span className="text-purple-500 font-bold text-lg leading-none">
                        •
                      </span>
                      <span>{skill.nama}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 border-b border-slate-800/50">
          <div className="space-y-12">
            <div className="space-y-2">
              <p className="text-sm font-mono text-blue-400 uppercase tracking-widest">
                // Works
              </p>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
                Recent Works
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projectList.map((project: any) => (
                <div
                  key={project.id}
                  className="flex flex-col bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-all"
                >
                  {project.gambar && (
                    <div className="relative h-44 overflow-hidden bg-slate-950">
                      <img
                        src={project.gambar}
                        alt={project.judul}
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {project.judul}
                    </h3>

                    {/* FITUR LIHAT LEBIH BANYAK PADA DESKRIPSI */}
                    <details className="group/proj-desc flex-1 mb-6">
                      <summary className="list-none cursor-pointer text-xs text-slate-400 leading-relaxed group-hover/proj-desc:text-slate-300">
                        <span className="line-clamp-3">
                          {project.deskripsi}
                        </span>
                        <span className="text-blue-400 font-mono text-[10px] mt-2 block group-open/proj-desc:hidden">
                          ▶ Lihat lebih banyak
                        </span>
                      </summary>
                      <p className="text-slate-400 text-xs leading-relaxed mt-2 p-3 bg-slate-950/60 rounded-xl border border-slate-900 animate-in fade-in">
                        {project.deskripsi}
                      </p>
                      <span className="text-blue-400 font-mono text-[10px] mt-2 block cursor-pointer hidden group-open/proj-desc:block">
                        ▼ Sembunyikan
                      </span>
                    </details>

                    <div className="mt-auto">
                      <a
                        href={project.github_link}
                        target="_blank"
                        className="block w-full py-2 border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-lg text-center text-[11px] font-bold transition-colors uppercase"
                      >
                        Source
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="certifications"
          className="py-20 border-b border-slate-800/50"
        >
          <div className="space-y-12">
            <div className="space-y-2">
              <p className="text-sm font-mono text-blue-400 uppercase tracking-widest">
                // Achievements
              </p>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
                Certificate
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certList.map((cert: any) => (
                <div
                  key={cert.id}
                  className="flex flex-col bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 group"
                >
                  {cert.gambar_sertifikat && (
                    <div className="relative h-44 overflow-hidden bg-slate-950 flex items-center justify-center p-2 border-b border-slate-800/50">
                      <img
                        src={cert.gambar_sertifikat}
                        alt={cert.nama_sertifikasi}
                        className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[3rem]">
                      {cert.nama_sertifikasi}
                    </h3>

                    <details className="group/cert-desc flex-1 flex flex-col justify-end">
                      <summary className="list-none cursor-pointer text-[11px] font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 mb-2">
                        <span className="group-open/cert-desc:hidden">
                          ▶ Lihat lebih banyak
                        </span>
                        <span className="hidden group-open/cert-desc:inline">
                          ▼ Sembunyikan
                        </span>
                      </summary>
                      <p className="text-slate-400 text-xs leading-relaxed mt-2 p-3 bg-slate-950/60 rounded-xl border border-slate-900 animate-in fade-in slide-in-from-top-1 duration-200">
                        {cert.deskripsi_singkat}
                      </p>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CONTACT SECTION (TOMBOL EMIL SUDAH KEMBALI AMAN) */}
        <section id="contact" className="py-20">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-sm font-mono text-blue-400 uppercase tracking-widest">
              // Connect
            </p>
            <h2 className="text-4xl font-bold text-white">
              Let&apos;s Connect
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              Feel free to reach out for cyber security collaboration, code
              auditing, or web dev inquiries!
            </p>

            {/* Tombol yang langsung membuka aplikasi Email */}
            <a
              href="mailto:adrianusa290@gmail.com?subject=Hello%20Adrianus&body=Halo%20Adrianus,%20saya%20tertarik%20dengan%20portofolio%20Anda."
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all hover:scale-105 font-mono text-sm uppercase shadow-lg shadow-blue-900/20"
            >
              Send Email Directly
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 py-12 text-center text-slate-500 text-xs font-mono">
        © 2026 Adrianus. Portofolio.
      </footer>
    </div>
  );
}
