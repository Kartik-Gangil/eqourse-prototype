const { execSync } = require('child_process');
const fs = require('fs');

try {
  let output = "=== GIT STATUS ===\n";
  output += execSync('git status', { cwd: 'd:/equourse/website-prototype(eqourse)/eqourse-prototype', encoding: 'utf-8' });
  
  output += "\n=== MAIN COMMITS ===\n";
  output += execSync('git log -n 2 origin/main --oneline', { cwd: 'd:/equourse/website-prototype(eqourse)/eqourse-prototype', encoding: 'utf-8' });
  
  output += "\n=== PRODUCTION COMMITS ===\n";
  output += execSync('git log -n 2 origin/production --oneline', { cwd: 'd:/equourse/website-prototype(eqourse)/eqourse-prototype', encoding: 'utf-8' });

  output += "\n=== LOCAL MAIN COMMITS ===\n";
  output += execSync('git log -n 2 main --oneline', { cwd: 'd:/equourse/website-prototype(eqourse)/eqourse-prototype', encoding: 'utf-8' });

  output += "\n=== LOCAL PRODUCTION COMMITS ===\n";
  output += execSync('git log -n 2 production --oneline', { cwd: 'd:/equourse/website-prototype(eqourse)/eqourse-prototype', encoding: 'utf-8' });

  fs.writeFileSync('d:/equourse/website-prototype(eqourse)/eqourse-prototype/git_verification.txt', output);
  console.log("Verification saved to git_verification.txt");
} catch (e) {
  fs.writeFileSync('d:/equourse/website-prototype(eqourse)/eqourse-prototype/git_verification.txt', "Error: " + e.toString());
}
