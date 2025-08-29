-- Performance optimization indexes for faster project queries
-- Based on Supabase optimization best practices

-- Index for project slug lookups (most critical for project detail pages)
CREATE INDEX IF NOT EXISTS idx_project_slug ON "Project" (slug);

-- Index for project status and category filtering
CREATE INDEX IF NOT EXISTS idx_project_status_category ON "Project" (status, category);

-- Index for project updated_at for ISR and sorting
CREATE INDEX IF NOT EXISTS idx_project_updated_at ON "Project" ("updatedAt" DESC);

-- Index for project created_at for sorting
CREATE INDEX IF NOT EXISTS idx_project_created_at ON "Project" ("createdAt" DESC);

-- Composite index for project filtering and pagination
CREATE INDEX IF NOT EXISTS idx_project_status_updated ON "Project" (status, "updatedAt" DESC);

-- Index for units by project_id and availability
CREATE INDEX IF NOT EXISTS idx_units_project_availability ON "Unit" ("projectId", availability);

-- Index for units ordering by floor and unit number
CREATE INDEX IF NOT EXISTS idx_units_floor_number ON "Unit" ("projectId", floor, "unitNumber");

-- Index for highlights by project_id
CREATE INDEX IF NOT EXISTS idx_highlights_project ON "Highlight" ("projectId");

-- Index for amenities by project_id and category
CREATE INDEX IF NOT EXISTS idx_amenities_project_category ON "Amenity" ("projectId", category);

-- Index for floor plans by project_id and sort order
CREATE INDEX IF NOT EXISTS idx_floorplans_project_sort ON "FloorPlan" ("projectId", "sortOrder", level);

-- Index for FAQs by project_id
CREATE INDEX IF NOT EXISTS idx_faqs_project ON "Faq" ("projectId");

-- Index for nearby points by project_id and type
CREATE INDEX IF NOT EXISTS idx_nearbypoints_project_type ON "NearbyPoint" ("projectId", type, "distanceKm");

-- Index for anchor tenants by project_id and status
CREATE INDEX IF NOT EXISTS idx_anchors_project_status ON "AnchorTenant" ("projectId", status);

-- Index for pricing plans by project_id
CREATE INDEX IF NOT EXISTS idx_pricingplans_project ON "PricingPlan" ("projectId");

-- Index for pricing table by project_id
CREATE INDEX IF NOT EXISTS idx_pricingtable_project ON "PricingTable" ("projectId");

-- Partial index for available units only (more efficient for availability queries)
CREATE INDEX IF NOT EXISTS idx_units_available ON "Unit" ("projectId", "areaSqFt") WHERE availability = 'AVAILABLE';

-- Partial index for active projects only
CREATE INDEX IF NOT EXISTS idx_project_active ON "Project" ("updatedAt" DESC, slug) WHERE status IN ('READY', 'UNDER_CONSTRUCTION');

-- BRIN index for created_at (efficient for time-series data)
CREATE INDEX IF NOT EXISTS idx_project_created_brin ON "Project" USING BRIN ("createdAt");

-- Update table statistics for better query planning
ANALYZE "Project";
ANALYZE "Unit";
ANALYZE "Highlight";
ANALYZE "Amenity";
ANALYZE "FloorPlan";
ANALYZE "Faq";
ANALYZE "NearbyPoint";
ANALYZE "AnchorTenant";
ANALYZE "PricingPlan";
ANALYZE "PricingTable";

-- Comments for documentation
COMMENT ON INDEX idx_project_slug IS 'Critical index for project detail page lookups by slug';
COMMENT ON INDEX idx_project_updated_at IS 'Index for ISR revalidation and project sorting';
COMMENT ON INDEX idx_units_available IS 'Partial index for efficient available unit queries';
COMMENT ON INDEX idx_project_active IS 'Partial index for active project queries only';