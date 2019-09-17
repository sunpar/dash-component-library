const { exec } = require("child_process")
const { version, name } = require("../package.json")

exec(`tar czf ./${name}-${version}.tar.gz dist`, (err, stdout, stderr) => {
	if (err) {
		console.log(err)
		return
	}

	console.log(`${name} tarball created`)
	console.log(`stdout: ${stdout}`)
	console.log(`stderr: ${stderr}`)
})
