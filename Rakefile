require 'html-proofer'
require 'rubocop/rake_task'

desc 'Build the site'
task :build do
  sh 'bundle exec jekyll build'
end

desc 'Test the built site'
task :test => :build do
  options = {
    # Basic SEO checks based on requirements
    check_html: true,
    check_opengraph: true,
    check_favicon: true,
    check_img_http: true,
    enforce_https: true,
    
    # Allow our SEO-friendly redirects
    url_ignore: [
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
    hydra: { max_concurrency: 50 },
    
    # Development settings
    disable_external: true,
    internal_domains: ['localhost:4000']
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
  task.patterns = ['**/*.rb']
  task.fail_on_error = true
end

desc 'Run performance tests'
task :perf do
  puts 'Running performance tests...'
  # Add performance test commands here
end

desc 'Run all tests'
task :default => [:test, :lint, :perf]
