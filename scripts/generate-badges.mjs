import fs from 'node:fs';

const coverage = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'));

const mutationReport = JSON.parse(fs.readFileSync('reports/mutation/mutation.json', 'utf8'));

const coverageScore = coverage.total.lines.pct;

fs.mkdirSync('badges', { recursive: true });

fs.writeFileSync(
	'badges/coverage.json',
	JSON.stringify({
		schemaVersion: 1,
		label: 'coverage',
		message: `${coverageScore}%`,
		color: getColor(coverageScore),
	}),
);

const mutants = Object.values(mutationReport)
	.filter((file) => file && Array.isArray(file.mutants))
	.flatMap((file) => file.mutants);

const killed = mutants.filter((mutant) => mutant.status === 'Killed').length;

const survived = mutants.filter((mutant) => mutant.status === 'Survived').length;

const mutationScore = killed + survived === 0 ? 100 : (killed / (killed + survived)) * 100;

fs.writeFileSync(
	'badges/mutation.json',
	JSON.stringify({
		schemaVersion: 1,
		label: 'mutation',
		message: `${mutationScore}%`,
		color: getColor(mutationScore),
	}),
);

function getColor(score) {
	if (score >= 80) return 'brightgreen';
	if (score >= 60) return 'yellow';
	return 'red';
}
