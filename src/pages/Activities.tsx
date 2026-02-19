import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import workshopImg from "@/assets/workshop.jpg";
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

const timeline = [
  { date: "10 فبراير", title: "انطلاق الحملة", description: "إعلان رسمي وتوزيع المواد التوعوية على المؤسسات التعليمية." },
  { date: "11 فبراير", title: "اليوم العالمي للإنترنت الآمن", description: "أنشطة خاصة بمناسبة Safer Internet Day في جميع المدارس المشاركة." },
  { date: "12-20 فبراير", title: "ورشات في المدارس", description: "تنظيم ورشات تفاعلية حول الأمان الرقمي في المؤسسات التعليمية." },
  { date: "21-27 فبراير", title: "مسابقات وأنشطة", description: "مسابقات بين المدارس وعروض تقديمية من التلاميذ حول الاستخدام الآمن." },
  { date: "28 فبراير", title: "اختتام الحملة", description: "حفل اختتام وتكريم المدارس والتلاميذ المتميزين." },
];

const workshops = [
  { title: "ورشة كلمات المرور", description: "تعلم كيفية إنشاء كلمات مرور قوية وإدارتها بشكل آمن.", duration: "45 دقيقة" },
  { title: "ورشة الخصوصية الرقمية", description: "فهم أهمية حماية المعلومات الشخصية على الإنترنت.", duration: "60 دقيقة" },
  { title: "ورشة التنمر الإلكتروني", description: "التعرف على أشكال التنمر الإلكتروني وكيفية التعامل معه.", duration: "50 دقيقة" },
  { title: "ورشة التحقق من المعلومات", description: "تعلم كيفية التمييز بين الأخبار الحقيقية والمزيفة.", duration: "45 دقيقة" },
];

const Activities = () => {
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
              الأنشطة في المدارس
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 text-lg">
              ورشات وأنشطة تفاعلية في المؤسسات التعليمية المغربية
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-3xl font-bold text-foreground text-center mb-12"
          >
            <Calendar className="w-8 h-8 inline-block ml-2 text-primary" />
            الجدول الزمني للحملة
          </motion.h2>

          <div className="max-w-2xl mx-auto relative">
            <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-border" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.date}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i}
                className="relative flex gap-6 mb-8 last:mb-0"
              >
                <div className="w-12 h-12 rounded-full hero-gradient flex-shrink-0 flex items-center justify-center z-10">
                  <span className="text-primary-foreground text-xs font-bold">{i + 1}</span>
                </div>
                <motion.div
                  whileHover={{ x: -4, transition: { duration: 0.2 } }}
                  className="bg-card rounded-xl p-5 card-shadow border border-border flex-1"
                >
                  <div className="text-sm text-primary font-semibold mb-1">{item.date}</div>
                  <h3 className="font-bold text-card-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="text-3xl font-bold text-foreground mb-8"
              >
                أمثلة على الورشات الصفية
              </motion.h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {workshops.map((ws, i) => (
                  <motion.div
                    key={ws.title}
                    variants={fadeUp}
                    custom={i}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    className="bg-card rounded-xl p-5 card-shadow border border-border transition-shadow"
                  >
                    <h3 className="font-bold text-card-foreground mb-2">{ws.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{ws.description}</p>
                    <div className="flex items-center gap-1 text-xs text-primary font-medium">
                      <Clock className="w-3 h-3" />
                      {ws.duration}
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
              className="w-full md:w-80 flex-shrink-0"
            >
              <img src={workshopImg} alt="ورشة في المدرسة" className="rounded-2xl card-shadow w-full" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;
