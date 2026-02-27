import SectionHeader from "@/src/components/lp/SectionHeader"

const footerLinks = [
  { label: "世界観", href: "#world-view" },
  { label: "エージェント構成", href: "#system-diagram" },
  { label: "チーム紹介", href: "#sub-agents" },
  { label: "実装例", href: "#demo" },
] as const

export default function CtaFooterSection() {
  return (
    <>
      {/* CTA Section */}
      <section id="cta" className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
          <SectionHeader
            label="CALL TO ACTION"
            title="妖精たちに会いに行く"
          />

          <p className="text-lg text-slate-300/80 text-center mb-8 max-w-2xl mt-6">
            Claude Code agent fairies と一緒に、コーディングを楽しみ始めよう。
          </p>

          <a
            href="#hero"
            className="inline-block px-12 py-4 text-lg font-bold rounded-lg bg-gradient-to-r from-blue-400 to-cyan-400 text-white transition-all hover:from-blue-300 hover:to-cyan-300 hover:shadow-[0_0_24px_rgba(96,165,250,0.4)]"
            aria-label="ページトップに戻って始める"
          >
            Start with Agent Fairies
          </a>

          <p className="text-sm text-slate-400 mt-4">
            すべてのエージェントが用意しています
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Separator line */}
          <div
            className="h-0.5 w-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 my-12"
            aria-hidden="true"
          />

          {/* Footer content */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 text-sm text-slate-400">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
                Claude Code Agent Fairies
              </span>
            </div>

            {/* Navigation links */}
            <nav aria-label="フッターナビゲーション">
              <ul className="flex flex-col sm:flex-row items-center gap-4">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="hover:text-blue-300 transition-colors"
                      aria-label={`${link.label}セクションへ移動`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Copyright */}
          <p className="text-slate-500 text-xs mt-8 text-center">
            &copy; 2026 Claude Code Agent Fairies. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
