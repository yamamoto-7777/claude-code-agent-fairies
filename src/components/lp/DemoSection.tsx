import SectionHeader from "@/src/components/lp/SectionHeader"

/** File tree entries for the sidebar */
const fileTree = [
  { name: "src/", indent: 0, isDir: true },
  { name: "constants/", indent: 1, isDir: true },
  { name: "characters.ts", indent: 2, isDir: false },
  { name: "components/", indent: 1, isDir: true },
  { name: "ChatInput.tsx", indent: 2, isDir: false },
  { name: "lib/", indent: 1, isDir: true },
  { name: "mockApi.ts", indent: 2, isDir: false },
  { name: "app/", indent: 0, isDir: true },
  { name: "page.tsx", indent: 1, isDir: false },
] as const

export default function DemoSection() {
  return (
    <section id="demo" className="relative py-20">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          label="IMPLEMENTATION EXAMPLE"
          title="実装の流れ"
        />

        <div className="mt-12">
          {/* Code editor container */}
          <div className="border border-white/10 rounded-lg overflow-hidden">
            {/* Editor header bar */}
            <div className="bg-[#161b22] flex items-center gap-2 px-4 py-3 border-b border-white/10">
              {/* Traffic light dots */}
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-sm text-slate-400 ml-2 font-mono">
                example.tsx
              </span>
            </div>

            {/* Editor body */}
            <div className="flex">
              {/* File tree sidebar (hidden on small screens) */}
              <div className="hidden sm:block w-44 bg-[#0d1117] border-r border-white/10 py-3 shrink-0">
                <nav aria-label="ファイルツリー">
                  {fileTree.map((entry, i) => (
                    <div
                      key={i}
                      className="px-3 py-0.5 text-xs font-mono text-slate-400 hover:bg-white/5 cursor-default"
                      style={{ paddingLeft: `${12 + entry.indent * 12}px` }}
                    >
                      <span className="text-slate-500 mr-1" aria-hidden="true">
                        {entry.isDir ? ">" : " "}
                      </span>
                      {entry.name}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Code block */}
              <div className="bg-[#0d1117] flex-1 p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-sm sm:text-base leading-relaxed">
                  <CodeLine>
                    <span className="text-cyan-300">{"const"}</span>
                    <span className="text-slate-200">{" result "}</span>
                    <span className="text-cyan-300">{"= await"}</span>
                    <span className="text-slate-200">{" sendTask("}</span>
                    <span className="text-slate-200">{"{"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-200">{"  task: "}</span>
                    <span className="text-amber-300">{'"新機能を実装する"'}</span>
                    <span className="text-slate-200">{","}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-200">{"});"}</span>
                  </CodeLine>
                  <CodeLine />
                  <CodeLine>
                    <span className="text-slate-400">{"// "}</span>
                    <span className="text-indigo-300">{"りん"}</span>
                    <span className="text-slate-400">{": 設計完了 ... 実装計画を作成しました"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-400">{"// "}</span>
                    <span className="text-sky-300">{"ひなた"}</span>
                    <span className="text-slate-400">{": ファイル確認 ... 関連コードを発見"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-400">{"// "}</span>
                    <span className="text-amber-300">{"るな"}</span>
                    <span className="text-slate-400">{": 実装開始 ... コーディング完了！"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-400">{"// "}</span>
                    <span className="text-emerald-300">{"ゆい"}</span>
                    <span className="text-slate-400">{": テスト実行 ... 全件パス"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-400">{"// "}</span>
                    <span className="text-rose-300">{"つばき"}</span>
                    <span className="text-slate-400">{": レビュー開始 ... 合格"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-500 animate-cursor-blink">{"_"}</span>
                  </CodeLine>
                </pre>
              </div>
            </div>

            {/* Terminal output area */}
            <div className="bg-[#0d1117] border-t border-white/10 px-4 sm:px-6 py-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-500" aria-hidden="true">$</span>
                <span className="text-slate-400">output</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm font-mono">
                <span className="text-emerald-400" aria-hidden="true">&#10003;</span>
                <span className="text-emerald-300">All tasks completed successfully</span>
              </div>
              <div className="mt-1 text-xs font-mono text-slate-500">
                5 agents &#183; 12 steps &#183; 0 errors
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-base text-slate-300/80 mt-8 text-center max-w-2xl mx-auto leading-relaxed">
            ユーザーがタスク指示をすると、ひかが受け取り最適なエージェントに振り分け、
            各スペシャリストが実行し、完了を音声で報告します。
          </p>
        </div>
      </div>
    </section>
  )
}

/** Single line in the code block with consistent spacing. */
function CodeLine({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-[1.5em]">
      {children}
    </div>
  )
}
