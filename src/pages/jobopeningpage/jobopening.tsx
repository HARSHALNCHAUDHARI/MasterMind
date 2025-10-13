import { useState } from "react";
import { motion } from "framer-motion";
import { 
    FiBriefcase,  FiTrendingUp, FiMail, FiPhone, 
    FiMapPin, FiArrowRight, FiCheck, FiZap, FiTarget, FiBook,
    FiSend, FiFileText, FiUser
} from "react-icons/fi";
import { BiVideoPlus } from "react-icons/bi";
import { MdSearch, MdOutlinePhoneIphone } from "react-icons/md";
import { TbSpeakerphone, TbRocket } from "react-icons/tb";
import "./jobopening.css";


import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";
import CursorEffect from "../../components/animation/CursorEffect";
import HeaderV2 from "../../components/header/HeaderV2";
import FooterV3 from "../../components/footer/FooterV3";

const JobOpening = () => {
    const [expandedRole, setExpandedRole] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        portfolio: "",
        resume: null as File | null,
        learning1: "",
        learning2: "",
        learning3: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 }
    };


    const fadeInLeft = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 }
    };


    const fadeInRight = {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 }
    };


    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };


    const positions = [
        {
            id: 1,
            letter: "A",
            title: "Video Editor",
            subtitle: "Visual Storyteller",
            description: "Turn briefs into scroll-stopping stories; fast, precise, and brand-true.",
            icon: BiVideoPlus,
            responsibilities: [
                "Edit ads, reels, shorts, and long-form content",
                "Elevate footage with clean cuts, typography, sound design",
                "Collaborate with copy, design, and performance teams",
                "Iterate quickly from feedback while maintaining quality"
            ],
            requirements: [
                "Strong command of Premiere Pro/After Effects",
                "Portfolio that proves taste, timing, and detail",
                "Discipline with file management and platform specs",
                "Ready to learn AI tools for routine tasks"
            ],
            growth: "Senior Video Editor → Motion Lead → Creative Production Lead"
        },
        {
            id: 2,
            letter: "B",
            title: "SEO Executive",
            subtitle: "Growth Driver",
            description: "Structured, curious, relentless about organic growth.",
            icon: MdSearch,
            responsibilities: [
                "Own keyword research, clustering, on-page implementation",
                "Drive technical SEO with dev and content teams",
                "Build clean backlink strategies and monitor rankings",
                "Write crisp briefs for content that targets intent"
            ],
            requirements: [
                "Solid grasp of on-page/off-page/technical SEO",
                "Hands-on with GA/Search Console and SEO suites",
                "Clear reporting: insights → actions → outcomes",
                "Ready to adapt AI for audits and optimization"
            ],
            growth: "Senior SEO → SEO Lead → Organic Growth Manager"
        },
        {
            id: 3,
            letter: "C",
            title: "Social Media Strategist",
            subtitle: "Community Builder",
            description: "Strategy first, execution tight, brand voice consistent.",
            icon: MdOutlinePhoneIphone,
            responsibilities: [
                "Build platform-specific plans with clear objectives",
                "Own content calendar and ship campaigns on schedule",
                "Track insights and optimize based on data",
                "Manage community: comments, DMs, reputation"
            ],
            requirements: [
                "Strong copy instincts and concepting ability",
                "Comfort with analytics and performance storytelling",
                "Experience with paid boosts and collaborations",
                "Ready to use AI for ideation and content QA"
            ],
            growth: "Senior Social → Brand Lead → Marketing Manager"
        },
        {
            id: 4,
            letter: "D",
            title: "PPC Executive",
            subtitle: "Performance Expert",
            description: "Numbers-led, accountable to outcomes, disciplined with testing.",
            icon: TbSpeakerphone,
            responsibilities: [
                "Plan, launch, optimize campaigns across Google Ads and Meta",
                "Own keyword strategy, audiences, bid/budget control",
                "Set up clean conversion tracking and funnel measurement",
                "Report with clarity: what changed, why, what's next"
            ],
            requirements: [
                "Hands-on with Google/Meta platforms and best practices",
                "Comfort with spreadsheets and attribution basics",
                "Creative rigor: crafting briefs that convert",
                "Ready to use AI for query mining and analysis"
            ],
            growth: "Senior PPC → Performance Lead → Growth Manager"
        }
    ];


const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
        newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
        newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
        newErrors.phone = "Invalid phone number";
    }
    if (!formData.role) newErrors.role = "Please select a role";
    // REMOVED: Portfolio validation - now optional
    if (!formData.resume) newErrors.resume = "Resume is required";
    if (!formData.learning1.trim()) newErrors.learning1 = "Learning 1 is required";
    if (!formData.learning2.trim()) newErrors.learning2 = "Learning 2 is required";
    if (!formData.learning3.trim()) newErrors.learning3 = "Learning 3 is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
            if (errors.resume) {
                setErrors(prev => ({ ...prev, resume: "" }));
            }
        }
    };


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    setIsSubmitting(true);

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('portfolio', formData.portfolio);
    formDataToSend.append('learning1', formData.learning1);
    formDataToSend.append('learning2', formData.learning2);
    formDataToSend.append('learning3', formData.learning3);
    
    if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
    }

    try {
        const response = await fetch('http://localhost:3001/api/apply', {
            method: 'POST',
            body: formDataToSend,
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                role: "",
                portfolio: "",
                resume: null,
                learning1: "",
                learning2: "",
                learning3: ""
            });
        } else {
            alert('Error: ' + data.message);
        }

    } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to submit application. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
};



    return (

        <div className="careers-final">
            <div className="bg-orb orb-purple"></div>
            <div className="bg-orb orb-pink"></div>
            <div className="bg-orb orb-blue"></div>
            <div className="mesh-gradient"></div>

                <HeaderV2 />
                <CursorEffect />
                <DarkClass />
                <ThemeDark />
            {/* Hero */}
            <section className="hero-final">
                <div className="container-final">
                    <div className="hero-grid">
                        <motion.div 
                            className="hero-left"
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div 
                                className="hero-tag-final"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="tag-dot-final"></div>
                                <span>NOW HIRING · 4 POSITIONS</span>
                            </motion.div>
                            
                            <motion.h1 
                                className="hero-title-final"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                JOIN THE<br/>
                                <span className="text-red">GROWTH</span><br/>
                                <span className="text-red">JOURNEY</span>
                            </motion.h1>
                            
                            <motion.p 
                                className="hero-desc"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                Build something extraordinary with a team that went from 2 projects to 25+ in months. This isn't just a job—it's your chance to shape the future of digital marketing.
                            </motion.p>


                            <motion.div 
                                className="hero-buttons"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <a href="#roles" className="hero-btn-primary">
                                    View Open Roles
                                    <FiArrowRight />
                                </a>
                                <a href="#apply" className="hero-btn-secondary">
                                    Apply Now
                                </a>
                            </motion.div>
                        </motion.div>


                        <motion.div 
                            className="hero-right"
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="hero-stats-grid">
                                <motion.div 
                                    className="stat-card"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="stat-value">25+</div>
                                    <div className="stat-label">Active Projects</div>
                                </motion.div>
                                <motion.div 
                                    className="stat-card"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="stat-value">10+</div>
                                    <div className="stat-label">Team Members</div>
                                </motion.div>
                                <motion.div 
                                    className="stat-card stat-card-wide"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="stat-value">1150%</div>
                                    <div className="stat-label">Growth Rate</div>
                                    <div className="stat-subtitle">In 10 Months</div>
                                </motion.div>
                            </div>


                            <div className="hero-company">
                                <div className="company-badge">
                                    <FiBriefcase />
                                    <span>MasterMind Web Developers</span>
                                </div>
                                <div className="company-location">
                                    <FiMapPin />
                                    <span>Pune, India</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Journey */}
            <section className="journey-final" id="story">
                <div className="container-final">
                    <div className="journey-layout">
                        <motion.div 
                            className="journey-left-final"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            variants={fadeInLeft}
                        >
                            <div className="label-final">OUR STORY</div>
                            <h2 className="title-final">
                                THE<br/>
                                <span className="text-red">JOURNEY</span>
                            </h2>
                            <p className="desc-final">
                                From 2 projects in January 2025 to 25+ projects with a 10-member team. 
                                This isn't just a job—it's a chance to build something extraordinary.
                            </p>
                            
                            <div className="perks-final">
                                {[
                                    { icon: FiCheck, title: "Real Impact", desc: "Your work matters from day one" },
                                    { icon: FiTarget, title: "Ownership", desc: "Direct control over outcomes" },
                                    { icon: FiZap, title: "Fast Growth", desc: "Learn and scale rapidly" }
                                ].map((perk, idx) => (
                                    <motion.div 
                                        key={idx}
                                        className="perk-final"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        variants={fadeInUp}
                                    >
                                        <div className="perk-icon-final">
                                            <perk.icon />
                                        </div>
                                        <div>
                                            <h4>{perk.title}</h4>
                                            <p>{perk.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="journey-right-final"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            variants={fadeInRight}
                        >
                            <div className="timeline-final">
                                <div className="timeline-line-final"></div>
                                <div className="timeline-point-final">
                                    <div className="point-circle-final"></div>
                                    <div className="point-box-final">
                                        <span className="point-date-final">JAN 2025</span>
                                        <h3>2 Projects</h3>
                                        <p>Single founder starts journey</p>
                                    </div>
                                </div>
                                <div className="timeline-point-final">
                                    <div className="point-circle-final"></div>
                                    <div className="point-box-final">
                                        <span className="point-date-final">NOW</span>
                                        <h3>25+ Projects</h3>
                                        <p>10-member strong team</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Looking For */}
            <section className="looking-final">
                <div className="container-final">
                    <motion.div 
                        className="header-center-final"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        variants={fadeInUp}
                    >
                        <div className="label-final">IDEAL CANDIDATE</div>
                        <h2 className="title-final">
                            WE'RE <span className="text-red">LOOKING FOR</span>
                        </h2>
                    </motion.div>


                    <div className="qualities-final">
                        {[
                            { num: "01", icon: FiZap, title: "Tech-Savvy", desc: "Excited about AI, automation, and new tools" },
                            { num: "02", icon: FiTarget, title: "Growth-Oriented", desc: "Building foundations, not just seeking jobs" },
                            { num: "03", icon: TbRocket, title: "Action-Driven", desc: "Learn fast, adapt quick, execute well" }
                        ].map((quality, idx) => (
                            <motion.div 
                                key={idx}
                                className="quality-final"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.15 }}
                                variants={scaleIn}
                            >
                                <div className="quality-num-final">{quality.num}</div>
                                <div className="quality-icon-final"><quality.icon /></div>
                                <h3>{quality.title}</h3>
                                <p>{quality.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Roles */}
            <section className="roles-final" id="roles">
                <div className="container-final">
                    <motion.div 
                        className="header-left-final"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        variants={fadeInUp}
                    >
                        <div className="label-final">OPEN ROLES</div>
                        <h2 className="title-final">
                            AVAILABLE<br/>
                            <span className="text-red">POSITIONS</span>
                        </h2>
                    </motion.div>


                    <div className="roles-grid-final">
                        {positions.map((job, idx) => {
                            const IconComponent = job.icon;
                            const isOpen = expandedRole === job.id;
                            
                            return (
                                <motion.div 
                                    key={job.id} 
                                    className="role-final"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    variants={fadeInUp}
                                >
                                    <div className="role-letter-final">{job.letter}</div>
                                    
                                    <div className="role-head-final">
                                        <div className="role-icon-final">
                                            <IconComponent size={32} />
                                        </div>
                                        <div className="role-info-final">
                                            <h3>{job.title}</h3>
                                            <p>{job.subtitle}</p>
                                        </div>
                                        <button 
                                            className="role-btn-final"
                                            onClick={() => setExpandedRole(isOpen ? null : job.id)}
                                        >
                                            <FiArrowRight 
                                                size={20}
                                                style={{ 
                                                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                                    transition: 'transform 0.3s'
                                                }}
                                            />
                                        </button>
                                    </div>


                                    <p className="role-desc-final">{job.description}</p>


                                    {isOpen && (
                                        <motion.div 
                                            className="role-expand-final"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <div className="role-cols-final">
                                                <div>
                                                    <h4>Responsibilities</h4>
                                                    <ul>
                                                        {job.responsibilities.map((item, idx) => (
                                                            <li key={idx}>
                                                                <FiCheck size={16} />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4>Requirements</h4>
                                                    <ul>
                                                        {job.requirements.map((item, idx) => (
                                                            <li key={idx}>
                                                                <FiCheck size={16} />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="role-growth-final">
                                                <FiTrendingUp />
                                                <span><strong>Growth Path:</strong> {job.growth}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* Application Form */}
            <section className="apply-final" id="apply">
                <div className="container-final">
                    <motion.div 
                        className="header-center-final"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        variants={fadeInUp}
                    >
                        <div className="label-final">APPLICATION</div>
                        <h2 className="title-final">
                            APPLY <span className="text-red">NOW</span>
                        </h2>
                        <p className="apply-subtitle">Fill out the form below to submit your application</p>
                    </motion.div>


                    <motion.form 
                        className="application-form"
                        onSubmit={handleSubmit}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        variants={fadeInUp}
                    >
                        <div className="form-grid">
                            {/* Personal Information */}
                            <motion.div 
                                className="form-section"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                variants={fadeInLeft}
                            >
                                <h3 className="form-section-title">
                                    <FiUser />
                                    Personal Information
                                </h3>
                                
                                <div className="form-group">
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        className={errors.name ? "error" : ""}
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>


                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your.email@example.com"
                                        className={errors.email ? "error" : ""}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>


                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="10-digit number"
                                        className={errors.phone ? "error" : ""}
                                    />
                                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                                </div>
                            </motion.div>


                            {/* Position & Portfolio */}
                            <motion.div 
                                className="form-section"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                variants={fadeInRight}
                            >
                                <h3 className="form-section-title">
                                    <FiBriefcase />
                                    Position & Portfolio
                                </h3>
                                
                                <div className="form-group">
                                    <label htmlFor="role">Position Applied For *</label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className={errors.role ? "error" : ""}
                                    >
                                        <option value="">Select a position</option>
                                        {positions.map(pos => (
                                            <option key={pos.id} value={pos.title}>{pos.title}</option>
                                        ))}
                                    </select>
                                    {errors.role && <span className="error-message">{errors.role}</span>}
                                </div>


                                <div className="form-group">
                                    <label htmlFor="portfolio">Portfolio / Work Links (Optional)</label>

                                    <input
                                        type="url"
                                        id="portfolio"
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleInputChange}
                                        placeholder="https://yourportfolio.com"
                                        className={errors.portfolio ? "error" : ""}
                                    />
                                    {errors.portfolio && <span className="error-message">{errors.portfolio}</span>}
                                </div>


                                <div className="form-group">
                                    <label htmlFor="resume">Resume (PDF) *</label>
                                    <div className="file-input-wrapper">
                                        <input
                                            type="file"
                                            id="resume"
                                            name="resume"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className={errors.resume ? "error" : ""}
                                        />
                                        <label htmlFor="resume" className="file-label">
                                            <FiFileText />
                                            {formData.resume ? formData.resume.name : "Choose PDF file"}
                                        </label>
                                    </div>
                                    {errors.resume && <span className="error-message">{errors.resume}</span>}
                                </div>
                            </motion.div>


                            {/* Recent Learnings */}
                            <motion.div 
                                className="form-section full-width"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                variants={fadeInUp}
                            >
                                <h3 className="form-section-title">
                                    <FiBook />
                                    3 Recent Learnings (Last 90 Days) *
                                </h3>
                                
                                <div className="form-group">
                                    <label htmlFor="learning1">Learning 1</label>
                                    <textarea
                                        id="learning1"
                                        name="learning1"
                                        value={formData.learning1}
                                        onChange={handleInputChange}
                                        placeholder="Describe something you learned recently"
                                        rows={2}
                                        className={errors.learning1 ? "error" : ""}
                                    />
                                    {errors.learning1 && <span className="error-message">{errors.learning1}</span>}
                                </div>


                                <div className="form-group">
                                    <label htmlFor="learning2">Learning 2</label>
                                    <textarea
                                        id="learning2"
                                        name="learning2"
                                        value={formData.learning2}
                                        onChange={handleInputChange}
                                        placeholder="Describe another recent learning"
                                        rows={2}
                                        className={errors.learning2 ? "error" : ""}
                                    />
                                    {errors.learning2 && <span className="error-message">{errors.learning2}</span>}
                                </div>


                                <div className="form-group">
                                    <label htmlFor="learning3">Learning 3</label>
                                    <textarea
                                        id="learning3"
                                        name="learning3"
                                        value={formData.learning3}
                                        onChange={handleInputChange}
                                        placeholder="Describe your third recent learning"
                                        rows={2}
                                        className={errors.learning3 ? "error" : ""}
                                    />
                                    {errors.learning3 && <span className="error-message">{errors.learning3}</span>}
                                </div>
                            </motion.div>
                        </div>


                        <motion.div 
                            className="form-footer"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            variants={scaleIn}
                        >
                            <div className="warning-final">
                                <div className="warning-icon-final">⚠️</div>
                                <div>
                                    <strong>Important Notice</strong>
                                    <p>Work From Home (WFH) is not allowed. This is an office-based role in Pune.</p>
                                </div>
                            </div>


                            <motion.button 
                                type="submit" 
                                className="submit-btn"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
                                <FiSend />
                            </motion.button>


                            <div className="contact-info">
                                <p>Questions? Reach out to us:</p>
                                <div className="contact-links">
                                    <a href="mailto:info@mastermindweb.in">
                                        <FiMail /> info@mastermindweb.in
                                    </a>
                                    <a href="tel:7385855808">
                                        <FiPhone /> 73858 55808
                                    </a>
                                    <a href="https://maps.app.goo.gl/1WAsvB7K5rytENRcA" target="_blank" rel="noreferrer">
                                        <FiMapPin /> Pune Office
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.form>
                </div>
            </section>


            {/* Benefits */}
            <section className="benefits-final">
                <div className="container-final">
                    <motion.div 
                        className="header-center-final"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        variants={fadeInUp}
                    >
                        <div className="label-final">PERKS & BENEFITS</div>
                        <h2 className="title-final">
                            WHAT YOU'LL <span className="text-red">GET</span>
                        </h2>
                    </motion.div>


                    <div className="benefits-grid-final">
                        {[
                            { icon: FiTarget, title: "Ownership", desc: "Craft, clarity, and direct control" },
                            { icon: FiBook, title: "Growth", desc: "Mentorship and AI workflows" },
                            { icon: TbRocket, title: "Impact", desc: "Clean processes and results" },
                            { icon: FiZap, title: "Balance", desc: "Weekends to recharge" }
                        ].map((benefit, idx) => (
                            <motion.div 
                                key={idx}
                                className="benefit-final"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                variants={scaleIn}
                            >
                                <benefit.icon className="benefit-icon-final" />
                                <h3>{benefit.title}</h3>
                                <p>{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* CTA */}
            <section className="cta-final">
                <div className="container-final">
                    <motion.div 
                        className="cta-wrap-final"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        variants={scaleIn}
                    >
                        <div className="label-final">LET'S BUILD</div>
                        <h2 className="cta-title-final">
                            READY TO<br/>
                            <span className="text-red">START?</span>
                        </h2>
                        <p className="cta-sub-final">Join us in building the future of digital marketing</p>
                        <a href="#apply" className="cta-btn-final">
                            APPLY NOW
                            <FiArrowRight />
                        </a>
                    </motion.div>
                </div>
            </section>
                         <FooterV3 />
        </div>
    );
};


export default JobOpening;
