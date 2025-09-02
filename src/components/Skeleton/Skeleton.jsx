function Skeleton() {
  return (
    <div className="card-enhanced p-6 rounded-xl animate-fade-in">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-muted rounded-full animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
          <div className="h-3 bg-muted rounded w-24 animate-pulse"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4 mb-6">
        <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
      </div>

      {/* Image Skeleton */}
      <div className="w-full h-64 bg-muted rounded-xl mb-6 animate-pulse"></div>

      {/* Actions Skeleton */}
      <div className="border-t border-border/30 pt-4">
        <div className="h-10 bg-muted rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}

export default Skeleton;
