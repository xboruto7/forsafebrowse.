import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Building2, Globe, Award } from "lucide-react";
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

const objectives = [
  {
    icon: Target,
    title: "توعية التلاميذ",
    description: "تثقيف التلاميذ حول المخاطر المرتبطة بالاستخدام غير الآمن للإنترنت وتزويدهم بالأدوات اللازمة للحماية.",
  },
  {
    icon: Building2,
    title: "إشراك المؤسسات التعليمية",
    description: "تفعيل دور المدرسة في نشر ثقافة الاستخدام الآمن للإنترنت من خلال أنشطة وورشات عمل.",
  },
  {
    icon: Globe,
    title: "اليوم العالمي للإنترنت الآمن",
    description: "المشاركة في الاحتفال باليوم العالمي للإنترنت الآمن (Safer Internet Day) الذي يقام في فبراير من كل عام.",
  },
  {
    icon: Award,
    title: "تعزيز المواطنة الرقمية",
    description: "بناء جيل واعٍ قادر على التعامل المسؤول مع التكنولوجيا الرقمية واحترام حقوق الآخرين.",
  },
];

const About = () => {
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
              عن الحملة
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 text-lg">
              حملة وطنية تنظمها وزارة التربية الوطنية والتعليم الأولي والرياضة بالمملكة المغربية
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="bg-card rounded-xl p-8 card-shadow border border-border"
            >
              <h2 className="text-2xl font-bold text-card-foreground mb-4">السياق والأهداف</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  في إطار الاحتفال باليوم العالمي للإنترنت الآمن (Safer Internet Day 2026)، تنظم وزارة التربية الوطنية والتعليم الأولي والرياضة الحملة الوطنية للاستعمال الآمن للإنترنت، وذلك خلال الفترة من 10 إلى 28 فبراير 2026.
                </p>
                <p>
                  تهدف هذه الحملة إلى تحسيس وتوعية التلميذات والتلاميذ بمخاطر الاستخدام غير الآمن للإنترنت ووسائل التواصل الاجتماعي، وتعزيز قدراتهم على التعامل المسؤول مع الفضاء الرقمي.
                </p>
                <p>
                  <strong className="text-foreground">الشعار الوطني:</strong> "إنترنت آمن في المدرسة"
                </p>
              </div>
            </motion.div>
          </div>

          {/* Objectives */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-3xl font-bold text-foreground text-center mb-10"
          >
            أهداف الحملة
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {objectives.map((obj, i) => (
              <motion.div
                key={obj.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="bg-card rounded-xl p-6 card-shadow border border-border flex gap-4 transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg hero-gradient flex-shrink-0 flex items-center justify-center">
                  <obj.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{obj.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{obj.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
