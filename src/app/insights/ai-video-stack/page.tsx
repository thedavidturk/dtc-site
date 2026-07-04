"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ArticleJsonLd from "@/components/ArticleJsonLd";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const moreArticles = [
  {
    title: "Native Audio Changes Everything: The Year AI Learned to Score Its Own Footage",
    category: "AI + PRODUCTION",
    href: "/insights/ai-native-audio",
    gradient: "from-cyan-500/30 via-teal-900/50 to-deep-space",
  },
  {
    title: "From 13 Days to 27 Minutes: Rebuilding the Content Pipeline Around AI Video",
    category: "PRODUCTION STRATEGY",
    href: "/insights/ai-content-pipeline",
    gradient: "from-amber-500/30 via-orange-900/50 to-deep-space",
  },
];

export default function AiVideoStackArticle() {
  return (
    <main className="relative min-h-screen bg-deep-space text-white overflow-hidden">
      <ArticleJsonLd
        title="After Sora: Why the Best Brand Video Now Comes From a Stack, Not a Single Tool"
        description="OpenAI shut Sora down in March 2026. The studios making the best brand video now run a stack of tools, not a single one. Here is how we orchestrate it."
        datePublished="2026-06-01"
        url="https://davidturkcreative.com/insights/ai-video-stack"
      />

      {/* Back to home */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 text-sm text-white/60 hover:text-white transition-colors"
      >
        &larr; Back to home
      </Link>

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-800 to-indigo-950 opacity-20" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.15] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={staggerItem} className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white/80 border border-white/20 rounded-full">
                AI + VIDEO
              </span>
            </motion.div>
            <motion.h1
              variants={staggerItem}
              className="font-display text-h1 font-bold mb-6"
            >
              After Sora: Why the Best Brand Video Now Comes From a Stack, Not a Single Tool
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg md:text-xl text-white/70 leading-relaxed"
            >
              The era of betting your whole pipeline on one model is over. The studios shipping the
              best brand video in 2026 run a stack, choosing the right tool per shot and keeping a
              human creative director on the whole thing.
            </motion.p>
            <motion.div
              variants={staggerItem}
              className="mt-8 flex items-center gap-4 text-sm text-white/50"
            >
              <span>David Turk</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>8 min read</span>
            </motion.div>
            <motion.div variants={staggerItem} className="mt-10 h-px bg-gradient-to-r from-white/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <article className="relative px-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              The Day the Flagship Went Dark
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              In March 2026, OpenAI shut down Sora. Not paused, not rebranded. Shut down. The
              numbers told the story plainly enough: roughly fifteen million dollars a day to run
              against something like two point one million in lifetime revenue. That is not a
              product, that is a marketing budget with a generate button. When it went dark, a lot
              of brands woke up to the fact that they had built creative workflows on rented ground.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              We were not surprised in our studio, because we had never gone all in on it. The
              shutdown did not break our pipeline. It just confirmed the bet we had already made,
              which is that no single model is worth your loyalty. The hype-funded era of AI video
              ended that month. The sustainable-business era started, and it rewards a completely
              different kind of discipline.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              Single-Tool Loyalty Was Always a Liability
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              The instinct to standardize on one platform makes sense on paper. One login, one
              prompt grammar, one set of habits to teach the team. But video models are not
              utilities, they are opinionated instruments, and each one has a personality. Picking
              a favorite and forcing every shot through it is like hiring one camera operator and
              making them shoot the macro, the drone work, and the dialogue coverage too.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              When your one tool gets a price hike, a quality regression, or a shutdown notice, the
              cost is not just a subscription. It is every project mid-flight, every brand look you
              tuned to that model, every prompt library your team memorized. Concentration feels
              efficient right up until the moment it becomes the single point of failure for your
              entire output.
            </p>
          </motion.div>

          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="border-l-2 border-white/40 pl-6 py-2 my-12"
          >
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-white/90">
              &ldquo;Betting your pipeline on one model is not a strategy. It is a hope that the
              company behind it stays solvent, generous, and good. Sora was none of the three by
              March.&rdquo;
            </p>
          </motion.blockquote>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              Meet the Stack: One Job Per Tool
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              The agencies getting the best results in 2026 do not commit to a platform, they
              assemble a stack. In our studio the roster is specific. Runway carries the hero work,
              the shots that need real visual quality and tight creative control. Kling handles
              volume and multi-shot sequences, the coverage you need a lot of and need to stay
              consistent. Veo 3.1 owns native audio and the highest output specs, so it goes
              wherever spec and sound matter most. Pika is our social-first sandbox, the place we
              experiment fast and cheap before anything goes near a client deck.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              None of these is the best tool. Each is the best tool for a specific job. The skill
              is not knowing how to drive one of them. It is knowing which one to reach for when the
              shot calls for it, and how to make the seams disappear once the pieces come back
              together. That is closer to editing and casting than to prompting.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              The roster also stays liquid. When Sora went down, we did not rebuild a process, we
              swapped a name out of a lineup we already trusted. A stack is antifragile by design.
              Lose one tool and the work keeps moving, because the work was never about that tool.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              Orchestration Is the Actual Craft
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              Anyone can type a prompt. Almost nobody can hold a sixty-second brand spot together
              across four different generators, each with its own color science, motion feel, and
              frame logic. That is the work now. Matching grain and grade across tools, keeping a
              character recognizable from shot to shot, deciding which beat earns the expensive hero
              render and which one a fast pass will carry.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              We treat the stack the way a post house treats a finishing suite. Each tool is a
              station, the project moves through them in order, and a single sensibility governs the
              whole route. The output of one becomes the input or the reference for the next. The
              orchestration is the product. The individual clips are just raw stock.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              The Economics Nobody Can Ignore Anymore
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              This is no longer a fringe experiment. Around seventy-eight percent of marketing
              teams now put AI-generated video into at least one campaign per quarter. It is in the
              budget, in the calendar, and in the expectations. The brands asking whether to use it
              have mostly lost the thread. The real question is how to use it well.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              The cost curve is brutal in the best way. Production runs down roughly ninety-one
              percent against traditional methods. A sixty-second marketing video that used to take
              about thirteen days can be produced in something like twenty-seven minutes. When the
              floor drops that far, the differentiator stops being who can make video and becomes
              who can make video worth watching. Volume is free now. Taste is not.
            </p>
          </motion.div>

          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="border-l-2 border-white/40 pl-6 py-2 my-12"
          >
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-white/90">
              &ldquo;When anyone can generate a thousand clips before lunch, the scarce thing is not
              the clip. It is the judgment to know which one is any good.&rdquo;
            </p>
          </motion.blockquote>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              The Director Never Leaves the Chair
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              A stack is not an autopilot. The reason our work holds together across four tools is
              that one creative director is directing the whole pipeline, the same way you would
              direct a crew. Someone has to own the look, reject the eighty percent that is merely
              competent, and push for the version that actually says something. The models propose.
              A human decides.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              This is where most teams go wrong. They buy the tools, automate the generation, and
              wonder why the output feels like everyone else&rsquo;s output. It feels generic
              because no one was directing it. The stack gives you leverage. It does not give you a
              point of view. That part is still on us, and frankly it always will be.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              How to Build Your Own Stack
            </h2>
            <p className="text-white/70 leading-relaxed text-lg">
              Start by refusing the question of which single tool is best, because it has no useful
              answer. Map your real shot types instead. Hero moments, volume coverage, anything that
              lives or dies on sound, fast social tests. Then assign each category to the tool that
              wins it today, and stay ready to reassign when something better shows up next quarter.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              Keep your standards portable, not tool-specific. Document your brand look as a
              reference you can carry into any generator, so swapping a model never means restarting
              a project. And put a real director over the whole thing. The studios that win the next
              few years will not be the ones with the fanciest single tool. They will be the ones
              who orchestrate the best stack and bring the most taste to it. That is the bet we are
              making in our studio, and Sora going dark only made us more sure of it.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="h-px bg-white/10 my-16"
          />

          {/* More articles */}
          <div className="space-y-8">
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-sm font-medium tracking-wider text-white/50"
            >
              MORE PERSPECTIVES
            </motion.h3>
            <div className="grid gap-4">
              {moreArticles.map((article) => (
                <motion.div
                  key={article.href}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                >
                  <Link href={article.href} className="group block">
                    <div
                      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${article.gradient} p-6 transition-transform group-hover:scale-[1.02]`}
                    >
                      <span className="text-xs font-medium tracking-wider text-white/60">
                        {article.category}
                      </span>
                      <h4 className="mt-2 text-lg font-semibold text-white">
                        {article.title}
                      </h4>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
