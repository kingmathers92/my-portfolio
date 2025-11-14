import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const skills = [
    "JavaScript", "React", "Node.js", "Python", "TypeScript",
    "Next.js", "MongoDB", "PostgreSQL", "AWS", "Docker"
  ];

  return (
    <div ref={ref} className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="neon text-4xl md:text-6xl font-bold mb-8">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="holographic text-2xl md:text-3xl font-bold mb-6">
              Passionate Developer & Problem Solver
            </h3>

            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Hello! I'm Khaled, a software developer passionate about creating
                digital experiences that make a difference. My journey in tech started
                with curiosity and has evolved into a love for building innovative solutions.
              </p>

              <p>
                I specialize in full-stack development, with expertise in modern
                JavaScript frameworks, cloud technologies, and database design.
                I'm always eager to learn new technologies and tackle challenging problems.
              </p>

              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with the
                developer community.
              </p>
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <h4 className="text-cyan-400 text-xl font-semibold mb-4">
                Technologies I work with:
              </h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="glass px-4 py-2 rounded-full text-sm font-medium"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 245, 255, 0.2)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="glass p-8 rounded-3xl">
              <div className="space-y-6">
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-4 h-4 bg-green-400 rounded-full pulse"></div>
                  <span className="text-lg">Available for opportunities</span>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-4 h-4 bg-blue-400 rounded-full pulse"></div>
                  <span className="text-lg">Open to collaboration</span>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-4 h-4 bg-purple-400 rounded-full pulse"></div>
                  <span className="text-lg">Continuous learner</span>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 p-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <h5 className="text-xl font-bold mb-2 gradient-text">Fun Fact</h5>
                <p className="text-gray-300">
                  I've written over 100,000 lines of code and I'm still excited
                  about every new project! 🚀
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
