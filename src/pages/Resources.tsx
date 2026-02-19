import { motion, useScroll, useTransform } from "framer-motion";
import { Lock, Eye, KeyRound, MessageSquareWarning, Download, PlayCircle, Gamepad2, ExternalLink } from "lucide-react";
import safetyIcons from "@/assets/safety-icons.jpg";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const tipsForKids = [
  { icon: Lock, title: "احم أجهزتك", description: "استخدم كلمة مرور قوية لحماية هاتفك وحاسوبك ولا تشاركها مع أحد." },
  { icon: KeyRound, title: "كلمات مرور قوية", description: "اختر كلمات مرور طويلة تحتوي على أرقام وحروف ورموز، ولا تستخدم نفس الكلمة في كل مكان." },
  { icon: Eye, title: "حافظ على خصوصيتك", description: "لا تشارك معلوماتك الشخصية مثل اسمك الكامل أو عنوانك أو رقم هاتفك مع الغرباء." },
  { icon: MessageSquareWarning, title: "احذر من التنمر الإلكتروني", description: "إذا تعرضت لتنمر أو رسائل مزعجة، أخبر والديك أو أستاذك فوراً." },
];

const resources = [
  {
    icon: Download,
    title: "دليل الآباء والأساتذة",
    description: "دليل شامل يحتوي على نصائح عملية لمرافقة الأبناء في استخدامهم للإنترنت.",
    color: "bg-secondary",
  },
  {
    icon: PlayCircle,
    title: "فيديوهات توعوية",
    description: "فيديوهات قصيرة وممتعة تشرح مخاطر الإنترنت وكيفية الحماية منها.",
    color: "bg-accent",
  },
  {
    icon: Gamepad2,
    title: "ألعاب واختبارات",
    description: "ألعاب تفاعلية واختبارات لقياس مدى معرفتك بقواعد الأمان الرقمي.",
    color: "bg-primary",
  },
];

const Resources = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section ref={heroRef} className="hero-gradient py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.h1 variants={fadeUp} custom={0} className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">
              الموارد والنصائح
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 text-lg">
              كل ما تحتاجه لاستخدام آمن ومسؤول للإنترنت
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tips for Kids */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
            <div className="flex-1">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="text-3xl font-bold text-foreground mb-8"
              >
                نصائح للأطفال والتلاميذ
              </motion.h2>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
                className="space-y-4"
              >
                {tipsForKids.map((tip, i) => (
                  <motion.div
                    key={tip.title}
                    variants={fadeUp}
                    custom={i}
                    whileHover={{ x: -6, transition: { duration: 0.2 } }}
                    className="flex gap-4 bg-card rounded-xl p-5 card-shadow border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                      <tip.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-card-foreground mb-1">{tip.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{tip.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}
              className="w-64 md:w-80 flex-shrink-0"
            >
              <img src={safetyIcons} alt="أيقونات الأمان الرقمي" className="rounded-2xl card-shadow" />
            </motion.div>
          </div>

          {/* Resources Cards */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-3xl font-bold text-foreground text-center mb-10"
          >
            موارد قابلة للتحميل
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            {resources.map((res, i) => (
              <motion.div
                key={res.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card rounded-xl p-6 card-shadow border border-border text-center transition-shadow"
              >
                <div className={`w-14 h-14 rounded-xl ${res.color} flex items-center justify-center mx-auto mb-4`}>
                  <res.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-card-foreground mb-2">{res.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{res.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* External Tool Link */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="max-w-2xl mx-auto bg-accent/10 border border-accent/30 rounded-xl p-6 text-center"
          >
            <h3 className="font-bold text-foreground text-lg mb-2">أداة فحص المحتوى الرقمي</h3>
            <p className="text-muted-foreground text-sm mb-4">
              هل تريد التحقق من صحة صورة أو فيديو أو رسالة نصية؟ استخدم أداتنا الذكية
            </p>
            <a
              href="https://deep-scan-ai--idkhilhatim2.replit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-4 h-4" />
              جرّب الأداة الآن
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
