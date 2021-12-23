module.exports = {
  writerOpts: {
    transform: (commit, context) => {
      if (context.host.lastIndexOf(':') > context.host.indexOf(':')) {
        context.host = context.host?.substring(0, context.host.lastIndexOf(':'));
      }
      let discard = true;
      const issues = [];

      commit.notes.forEach((note) => {
        note.title = 'BREAKING CHANGES';
        discard = false;
      });
      if (commit.type === 'Update') {
        commit.type = '✨ Update';
      } else if (commit.type === 'Fix') {
        commit.type = '🐛 Bug Fix';
      } else if (commit.type === 'Perf') {
        commit.type = '⚡ Performance Improvements';
      } else if (commit.type === 'Revert' || commit.revert) {
        commit.type = '⏪ Reverts';
      } else if (discard) {
        return;
      } else if (commit.type === 'Doc') {
        commit.type = '📝 Documentation | 文档';
      } else if (commit.type === 'Style') {
        commit.type = '💄 Styles | 风格';
      } else if (commit.type === 'Refactor') {
        commit.type = '♻ Code Refactoring | 代码重构';
      } else if (commit.type === 'Test') {
        commit.type = '✅ Tests';
      } else if (commit.type === 'build') {
        commit.type = '👷‍ Build System | 构建';
      } else if (commit.type === 'ci') {
        commit.type = '🔧 Continuous Integration | CI 配置';
      } else if (commit.type === 'Chore') {
        commit.type = '🎫 Chores';
      }

      if (commit.scope === '*') {
        commit.scope = '';
      }
      if (typeof commit.hash === 'string') {
        commit.hash = commit.hash.substring(0, 7);
      }
      if (typeof commit.subject === 'string') {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl;
        if (url) {
          url = `${url}/issues/`;
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue);
            return `(${url}${issue})`;
          });

          commit.subject = `${commit.type}: ${commit.subject}`;
        }
        // if (context.host) {
        //   // User URLs.
        //   commit.subject = commit.subject.replace(
        //     /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
        //     (_, username) => {
        //       if (username.includes('/')) {
        //         return `@${username}`;
        //       }

        //       return `[@${username}](${context.host}/${username})`;
        //     }
        //   );
        // }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter((reference) => {
        if (issues.indexOf(reference.issue) === -1) {
          return true;
        }

        return false;
      });

      return commit;
    },
    groupBy: 'committerDate',
    commitGroupsSort: 'committerDate',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'type'
    // notesSort: compareFunc
  }
};
