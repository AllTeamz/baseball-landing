# frozen_string_literal: true

require 'html-proofer'
require 'rubocop/rake_task'

# Ensure UTF-8 encoding
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

desc 'Build the site'
task :build do
  sh 'bundle exec jekyll build'
end

desc 'Test the built site'
task :test => :build do
  options = {
    # Configure checks
    checks: [
      'Links',     # Check all hyperlinks
      'Images',    # Verify image sources exist
      'Scripts',   # Validate script references
      'Favicon',   # Ensure favicon is present
      'OpenGraph'  # Validate OpenGraph tags
    ],

    # Allow our SEO-friendly redirects
    ignore_urls: [
      # Common URL variations
      %r{/app/?},
      %r{/ios/?},
      %r{/download/?},
      # Sport-specific URLs
      %r{/baseball/?},
      %r{/recruiting/?},
      %r{/college-baseball/?},
      # Division-specific URLs
      %r{/ncaa/?},
      %r{/naia/?},
      %r{/juco/?}
    ],

    # HTML5 and Schema.org validation
    validation: {
      report_missing_names: true,
      report_missing_doctype: true,
      report_missing_lang: true,
      report_missing_title: true
    },

    # Performance settings
    parallel: { in_processes: 3 },
    max_concurrency: 50,

    # Development settings
    disable_external: true,
    internal_domains: ['localhost:4000'],

    # Enforce HTTPS
    enforce_https: true
  }
  
  begin
    HTMLProofer.check_directory('./_site', options).run
  rescue => e
    puts "HTMLProofer error: #{e.message}"
    exit 1
  end
end

desc 'Run RuboCop'
RuboCop::RakeTask.new(:lint) do |task|
  task.patterns = ['Rakefile', '**/*.rb']
  task.requires << 'rubocop-rake'
  task.fail_on_error = false
end

desc 'Run performance tests'
task :perf do
  puts 'Running performance tests...'
  # Add performance test commands here
end

desc 'Run all tests'
task :default => [:test, :lint, :perf]
