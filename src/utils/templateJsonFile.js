import {CLIENT_NAME} from '@/http/config';

export const templateJsonFile = (commutator) => {
	const {
		ovopName,
		neId,
		type,
		softwareVersion,
		commandSelect,
		x1Login,
		x1Password,
		protectedLogin,
		protectedPassword,
		mscNumber,
		x1Ip,
		x2Ip,
		x3Ip,
		x1Port,
		x2Port,
		x3Port,
	} = commutator;

	let fields = {
		ovopName,
		neId,
		type,
		softwareVersion,
		commandSelect,
		x1Login,
		x1Password,
		protectedLogin,
		protectedPassword,
		mscNumber,
		x1Ip,
		x2Ip,
		x3Ip,
		x1Port,
		x2Port,
		x3Port,
	};

	if (CLIENT_NAME === 'EricssonCs') {
		fields.commandMode = commutator.commandMode
		fields.subsystemType = commutator.subsystemType
	}
	if (CLIENT_NAME === 'EricssonEps') {
		fields.subsystemType = commutator.subsystemType
		fields.x1SshLogin = commutator.x1SshLogin
		fields.x1SshPassword = commutator.x1SshPassword
		fields.x1SshIp = commutator.x1SshIp
		fields.x1SshPort = commutator.x1SshPort
		fields.x1XmlIp = commutator.x1XmlIp
		fields.x1XmlPort = commutator.x1XmlPort
	}
	// if (CLIENT_NAME === 'ZteIms') {}
	if (CLIENT_NAME === 'HuaweiNgnFix') {
		fields.neAddress = commutator.neAddress
	}

	return {...fields}
}
