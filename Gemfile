source "https://rubygems.org"

# Core Dependencies
gem 'csv'  # Required for Ruby 3.4+
gem 'sass-embedded', '~> 1.69'  # Modern Sass implementation

# Core Jekyll
gem 'jekyll', '~> 3.9.3'  # Compatible with github-pages
gem 'github-pages', '~> 228', group: :jekyll_plugins
gem 'kramdown-parser-gfm', '~> 1.1.0'  # Required for GitHub Flavored Markdown

# Jekyll Plugins
group :jekyll_plugins do
  gem 'jekyll-seo-tag', '~> 2.8'
  gem 'jekyll-sitemap', '~> 1.4'
  gem 'jekyll-feed', '~> 0.15'
  gem 'jekyll-redirect-from', '~> 0.16'
  gem 'jekyll-minifier', '~> 0.1'
  # Note: jekyll-compress-images removed due to compatibility
end

# Development & Testing
group :development, :test do
  gem 'webrick', '~> 1.8'  # Required for Ruby 3+
  gem 'html-proofer', '~> 4.4'  # Test rendered HTML files
  gem 'rake', '~> 13.1'  # Task automation
  gem 'rubocop', '~> 1.42.0', require: false  # Ruby style checking
  gem 'rubocop-performance', '~> 1.15', require: false
  gem 'rubocop-rake', '~> 0.6.0', require: false  # Rake-specific RuboCop rules
  gem 'faraday-retry', '~> 2.2'  # Required for Faraday v2.0+ retry middleware
end