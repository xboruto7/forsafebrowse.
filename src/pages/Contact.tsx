import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, ExternalLink, Send } from "lucide-react";
import { useState, useRef } from "react";

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
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "الاسم مطلوب").max(100, "الاسم يجب أن يكون أقل من 100 حرف"),
  email: z.string().trim().email("البريد الإلكتروني غير صالح").max(254, "البريد الإلكتروني طويل جداً"),
  message: z.string().trim().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل").max(2000, "الرسالة يجب أن تكون أقل من 2000 حرف"),
});

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const validated = result.data;
    const subject = encodeURIComponent("رسالة من موقع الحملة الوطنية");
    const body = encodeURIComponent(`الاسم: ${validated.name}\nالبريد: ${validated.email}\n\n${validated.message}`);
    window.open(`mailto:idkhilhatim2@gmail.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

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
              تواصل معنا
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 text-lg">
              لديك سؤال أو اقتراح؟ لا تتردد في التواصل
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Contact Form */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="bg-card rounded-xl p-8 card-shadow border border-border"
            >
              <h2 className="text-2xl font-bold text-card-foreground mb-6">أرسل رسالة</h2>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-bold text-card-foreground text-lg mb-2">شكراً لك!</h3>
                  <p className="text-muted-foreground text-sm">سيتم فتح بريدك الإلكتروني لإرسال الرسالة.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-primary text-sm font-medium hover:underline"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-1">الاسم الكامل</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => { setFormData(prev => ({ ...prev, name: e.target.value })); setErrors(prev => ({ ...prev, name: "" })); }}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                      placeholder="أدخل اسمك"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={(e) => { setFormData(prev => ({ ...prev, email: e.target.value })); setErrors(prev => ({ ...prev, email: "" })); }}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-1">الرسالة</label>
                    <textarea
                      required
                      rows={4}
                      maxLength={2000}
                      value={formData.message}
                      onChange={(e) => { setFormData(prev => ({ ...prev, message: e.target.value })); setErrors(prev => ({ ...prev, message: "" })); }}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none resize-none"
                      placeholder="اكتب رسالتك هنا..."
                    />
                    {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    إرسال الرسالة
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-card rounded-xl p-6 card-shadow border border-border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-card-foreground">البريد الإلكتروني</h3>
                </div>
                <a href="mailto:idkhilhatim2@gmail.com" className="text-accent hover:underline text-sm" dir="ltr">
                  idkhilhatim2@gmail.com
                </a>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-card rounded-xl p-6 card-shadow border border-border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-bold text-card-foreground">روابط مفيدة</h3>
                </div>
                <div className="space-y-2">
                  <a
                    href="https://www.men.gov.ma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-accent text-sm hover:underline"
                  >
                    الموقع الرسمي لوزارة التربية الوطنية
                  </a>
                  <a
                    href="https://deep-scan-ai--idkhilhatim2.replit.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-accent text-sm hover:underline"
                  >
                    أداة فحص المحتوى الرقمي (DeepScan AI)
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-accent/10 border border-accent/30 rounded-xl p-6"
              >
                <h3 className="font-bold text-foreground mb-2">💡 هل تعلم؟</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  يمكنك استخدام أداة DeepScan AI للتحقق مما إذا كانت الصور أو الفيديوهات أو الرسائل النصية حقيقية أم مزيفة. أداة مجانية لحمايتك من المحتوى المضلل!
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
