const Logos: React.FC = () => {
  return (
    <section id="stats" className="py-20 px-5 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <p className="text-2xl md:text-3xl font-bold text-center mb-12">
          Join thousands of Muslims staying consistent with their prayers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Active Users */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
            <p className="text-sm md:text-base text-muted-foreground">Active Users</p>
          </div>

          {/* Prayers Logged */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">3M+</div>
            <p className="text-sm md:text-base text-muted-foreground">Prayers Logged</p>
          </div>

          {/* Countries */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">190+</div>
            <p className="text-sm md:text-base text-muted-foreground">Countries</p>
          </div>

          {/* App Rating */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">4.9★</div>
            <p className="text-sm md:text-base text-muted-foreground">App Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Logos;
