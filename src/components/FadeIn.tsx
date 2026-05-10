import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export function FadeIn({
  children, direction = 'up', delay = 0, duration = 0.6, className = '',
}: {
  children: ReactNode; direction?: 'up' | 'none'; delay?: number; duration?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: direction === 'up' ? 30 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children, staggerDelay = 0.1, className = '', initialDelay = 0,
}: {
  children: ReactNode; staggerDelay?: number; className?: string; initialDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: staggerDelay, delayChildren: initialDelay } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
