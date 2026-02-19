import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Calendar, BookOpen, Users, ArrowLeft, ExternalLink } from "lucide-react";
import { useRef } from "react";
import heroBanner from "@/assets/hero-banner.jpg";

const features = [
  {
    icon: Shield,
    title: "حماية رقمية",
    description: "تعلم كيف تحمي نفسك على الإنترنت",
  },
  {
    icon: BookOpen,
    title: "موارد تعليمية",
    description: "أدلة ونصائح للتلاميذ والآباء والأساتذة",
  },
  {
    icon: Users,
    title: "ورشات تفاعلية",
    description: "أنشطة عملية في المدارس المغربية",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img src={heroBanner} alt="حملة الإنترنت الآمن" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-foreground/70" />
        </motion.div>
        <motion.div className="relative container mx-auto px-4 py-24 md:py-36" style={{ opacity: heroOpacity }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground px-4 py-2 rounded-full text-sm mb-6"
            >
              <Calendar className="w-4 h-4" />
              <span>10 - 28 فبراير 2026</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-6xl font-black text-primary-foreground leading-tight mb-6"
            >
              إنترنت آمن
              <br />
              <span className="text-primary-foreground/80">في المدرسة</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
            >
              الحملة الوطنية للاستعمال الآمن للإنترنت — لنحمي أبناءنا في العالم الرقمي
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity animate-pulse-glow"
              >
                اكتشف المزيد
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <a
                href="https://deep-scan-ai--idkhilhatim2.replit.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                فحص المحتوى الرقمي
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">ماذا تقدم الحملة؟</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              برنامج شامل لتوعية التلاميذ والأسر بمخاطر الإنترنت وكيفية الاستخدام الآمن
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card rounded-xl p-8 card-shadow card-shadow-hover transition-shadow border border-border"
              >
                <motion.div
                  variants={scaleIn}
                  className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-5"
                >
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 hero-gradient overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl font-bold text-primary-foreground mb-4">
              شاركوا في الحملة الوطنية
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              اكتشفوا الموارد والنصائح المتاحة لحماية أبنائكم وتلامذتكم
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 bg-card text-card-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                الموارد والنصائح
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
