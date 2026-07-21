import fs from 'node:fs';

const coverage = JSON.parse(
  fs.readFileSync('coverage/coverage-summary.json', 'utf8')
);

const mutation = JSON.parse(
  fs.readFileSync('reports/mutation/mutation.json', 'utf8')
);

const coverageScore = coverage.total.lines.pct;

const mutationScore = mutation.mutationScore;

fs.mkdirSync('badges', { recursive: true });

fs.writeFileSync(
  'badges/coverage.json',
  JSON.stringify({
    schemaVersion: 1,
    label: 'coverage',
    message: `${coverageScore}%`,
    color: getColor(coverageScore),
  })
);

fs.writeFileSync(
  'badges/mutation.json',
  JSON.stringify({
    schemaVersion: 1,
    label: 'mutation',
    message: `${mutationScore}%`,
    color: getColor(mutationScore),
  })
);

function getColor(score) {
  if (score >= 80) return 'brightgreen';
  if (score >= 60) return 'yellow';
  return 'red';
}