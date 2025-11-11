import { motion } from 'framer-motion';

interface ProjectFiltersProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const ProjectFilters = ({
                            categories,
                            activeCategory,
                            onCategoryChange,
                        }: ProjectFiltersProps) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
                <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onCategoryChange(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                        activeCategory === category
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {category}
                </motion.button>
            ))}
        </div>
    );
};

export default ProjectFilters;