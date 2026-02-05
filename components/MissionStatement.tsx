
import React from 'react';
import { motion } from 'framer-motion';

const MissionStatement: React.FC = () => {
  return (
    <section id="mission" className="py-24 md:py-40 bg-accluav-black relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-accluav-orange text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Our Mission
            </h3>
            <p className="text-3xl md:text-5xl lg:text-6xl font-display font-medium leading-[1.1] text-white">
              We are radically transforming defense capabilities by engineering <span className="text-gray-500">autonomous systems</span> that operate at the speed of relevance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border-l border-white/20 pl-8"
            >
              <h4 className="text-xl font-bold mb-4 font-display">Software First</h4>
              <p className="text-gray-400 leading-relaxed">
                Unlike traditional defense contractors, AccelUAV approaches hardware problems with a software mindset. Our mapping engine, RLTM, enables real-time sensor fusion and autonomous decision making across all our platforms.
              </p>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="border-l border-white/20 pl-8"
            >
              <h4 className="text-xl font-bold mb-4 font-display">Rapid Iteration</h4>
              <p className="text-gray-400 leading-relaxed">
                The modern battlefield evolves daily. We deploy updates in hours, not years. Our modular hardware architecture allows for rapid prototyping and field-adaptable configurations.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
