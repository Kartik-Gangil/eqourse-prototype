const { execSync } = require('child_process');
try {
  execSync('git checkout src/pages/Sitemap.tsx', { cwd: 'd:/equourse/website-prototype(eqourse)/eqourse-prototype' });
  console.log("Success");
} catch (e) {
  console.error(e.toString());
}
