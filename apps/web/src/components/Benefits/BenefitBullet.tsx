import { motion, Variants } from "framer-motion"

import { IBenefitBullet } from "@/types"

interface BenefitBulletProps extends IBenefitBullet {
    variants?: Variants;
}

const BenefitBullet: React.FC<BenefitBulletProps> = ({ title, description, icon, variants }: BenefitBulletProps) => {
    return (
        <motion.div
            className="flex flex-col items-center mt-8 gap-3 lg:gap-5 lg:flex-row lg:items-start"
            variants={variants}
        >
            <div className="flex justify-center mx-auto lg:mx-0 flex-shrink-0 mt-3 w-fit">
                {icon}
            </div>
            <div>
                <h4 className="text-lg font-semibold">
                    {title}
                </h4>
                <p className="text-base text-foreground-accent">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}

export default BenefitBullet
