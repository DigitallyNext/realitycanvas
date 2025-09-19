import ProjectFilterSidebarClient from './ProjectFilterSidebarClient';

interface FilterOptions {
  category: string;
  status: string;
  city: string;
  state: string;
  priceRange: {
    min: number;
    max: number;
  };
}

interface ProjectFilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export default function ProjectFilterSidebar({ 
  filters,
  onFiltersChange, 
  onClearFilters
}: ProjectFilterSidebarProps) {
  return (
    <ProjectFilterSidebarClient
      filters={filters}
      onFiltersChange={onFiltersChange}
      onClearFilters={onClearFilters}
    />
  );
}