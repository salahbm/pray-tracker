export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'deploy',
        'docs',
        'feat',
        'improve',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'merge',
      ],
    ],
  },

  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing",
        enum: {
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨',
          },
          improve: {
            description: 'Improvements to an existing feature',
            title: 'Improvements',
            emoji: '👌',
          },
          fix: { description: 'A bug fix', title: 'Bug Fixes', emoji: '🐛' },
          deploy: {
            description: 'Deployment changes',
            title: 'Deployments',
            emoji: '🚀',
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: 'Formatting or style changes (no logic change)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: 'Refactoring without feature or bug changes',
            title: 'Refactor',
            emoji: '📦',
          },
          perf: {
            description: 'Performance improvements',
            title: 'Performance',
            emoji: '🚀',
          },
          test: {
            description: 'Adding or fixing tests',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: 'Build system or dependency changes',
            title: 'Build',
            emoji: '🛠',
          },
          ci: {
            description: 'CI configuration changes',
            title: 'CI',
            emoji: '⚙️',
          },
          chore: {
            description: 'Maintenance tasks',
            title: 'Chore',
            emoji: '♻️',
          },
          revert: {
            description: 'Revert a previous commit',
            title: 'Revert',
            emoji: '🗑',
          },
          merge: {
            description: 'Merge branches',
            title: 'Merge',
            emoji: '🔀',
          },
        },
      },
      scope: { description: 'Scope of this change (optional)' },
      subject: { description: 'Short description (imperative)' },
      body: { description: 'Longer explanation (optional)' },
      isBreaking: { description: 'Any breaking changes?' },
      breakingBody: { description: 'Explain breaking changes' },
      breaking: { description: 'Describe the breaking change' },
      isIssueAffected: { description: 'Does this affect any issues?' },
      issuesBody: { description: 'Explain issue impact' },
      issues: { description: 'Reference issues (e.g. #123)' },
    },
  },
};
