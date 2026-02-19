import { Link } from "react-router-dom";
import { Shield, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">إنترنت آمن 2026</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              الحملة الوطنية للاستعمال الآمن للإنترنت في المدارس المغربية
              <br />
              10 - 28 فبراير 2026
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-background/70 hover:text-background transition-colors text-sm">عن الحملة</Link>
              <Link to="/resources" className="text-background/70 hover:text-background transition-colors text-sm">الموارد والنصائح</Link>
              <Link to="/activities" className="text-background/70 hover:text-background transition-colors text-sm">الأنشطة في المدارس</Link>
              <Link to="/contact" className="text-background/70 hover:text-background transition-colors text-sm">تواصل معنا</Link>
            </div>
          </div>

          {/* Contact & Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">روابط مفيدة</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.men.gov.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors text-sm flex items-center gap-2"
              >
                <ExternalLink className="w-3 h-3" />
                وزارة التربية الوطنية
              </a>
              <a
                href="https://deep-scan-ai--idkhilhatim2.replit.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors text-sm flex items-center gap-2"
              >
                <ExternalLink className="w-3 h-3" />
                أداة فحص المحتوى الرقمي
              </a>
              <a
                href="mailto:idkhilhatim2@gmail.com"
                className="text-background/70 hover:text-background transition-colors text-sm flex items-center gap-2"
              >
                <Mail className="w-3 h-3" />
                idkhilhatim2@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center">
          <p className="text-background/50 text-sm">
            © 2026 وزارة التربية الوطنية والتعليم الأولي والرياضة - المملكة المغربية
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
