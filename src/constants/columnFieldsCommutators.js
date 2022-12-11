import { commandSelect, typeSelect, subsystemTypeSelect, versionSoftSelect} from "@constants/selectors";
import { CLIENT_NAME } from '@/http/config';

const nameField = {
  name: "ovopName",
  title: "NE назва",
  type: "text",
};

const neIdField = {
  name: "neId",
  title: "NE Id",
  type: "number",
}

const neAddressField = {
	name: "neAddress",
	title: "NE Address",
	type: "text",
}

const usernameField = {
  name: "x1Login",
  title: "X1 Логін",
  type: "text",
};
const passwordField = {
  name: "x1Password",
  title: "X1 Пароль",
  type: "text",
};

const protectedUsernameField = {
  name: "protectedLogin",
  title: "Protected Логін",
  type: "text",
};
const protectedPasswordField = {
  name: "protectedPassword",
  title: "Protected Пароль",
  type: "text",
};

const x1IpField = {
  name: "x1Ip",
  title: "X1 Ip",
  type: "text",
};

const x1PortField = {
  name: "x1Port",
  title: "X1 Порт",
  type: "number"
};
const x3PortField = {
  name: "x3Port",
  title: "X3 Порт",
  type: "number"
};

const x2IpField = {
	name: "x2Ip",
	title: "X2 Ip",
	type: "text",
};

const x3IpField = {
	name: "x3Ip",
	title: "X3 Ip",
	type: "text",
};

const x2PortField = {
	name: "x2Port",
	title: "X2 Порт",
	type: "number"
};

const mscNumberField = {
  name: "mscNumber",
  title: "MSC Number",
  type: "number",
};

const x1SshIpField = {
  name: 'x1SshIp',
  title: 'x1 Ssh Ip',
  type: 'text'
}
const x1SshPortField = {
  name: 'x1SshPort',
  title: 'x1 Ssh Port',
  type: 'text'
}
const x1XmlIpField = {
  name: 'x1XmlIp',
  title: 'x1 Xml Ip',
  type: 'text'
}
const x1XmlPortField = {
  name: 'x1XmlPort',
  title: 'x1 Xml Port',
  type: 'text'
};
const x1SshLoginField = {
  name: 'x1SshLogin',
  title: 'x1 Ssh Login',
  type: 'text'
};
const x1SshPasswordField = {
  name: 'x1SshPassword',
  title: 'x1 Ssh Password',
  type: 'text'
};

const columnERICSSONCsFields = [
  {
    id: "1",
    fields: [
      nameField,
      neIdField,
      typeSelect,
      versionSoftSelect,
			subsystemTypeSelect,
      commandSelect,
    ]
  },
  {
    id: "2",
    fields: [
      usernameField,
      passwordField,
      protectedUsernameField,
      protectedPasswordField,
			mscNumberField,
    ]
  },
  {
    id: "3",
    fields: [
      x1IpField,
			x2IpField,
			x3IpField,
      x1PortField,
			x2PortField,
			x3PortField,
    ]
  }
];

const columnERICSSONEpsFields = [
  {
    id: "1",
    fields: [
      nameField,
      neIdField,
      typeSelect,
      x1SshLoginField,
      x1SshPasswordField,
    ]
  },
  {
    id: "2",
    fields: [
      x1SshIpField,
      x1SshPortField,
      x1XmlIpField,
      x1XmlPortField,
    ]
  },
  {
    id: "3",
    fields: [
      x2IpField,
      x2PortField,
      x3IpField,
      x3PortField,
    ]
  }
];

const columnZTEFields = [
  {
    id: "1",
    fields: [
      nameField,
      neIdField,
			x2IpField

    ]
  },
  {
    id: "2",
    fields: [
      usernameField,
      passwordField,
			x3IpField
    ]
  },
  {
    id: "3",
    fields: [
      x1IpField,
      typeSelect,
			x2PortField
    ]
  },
  {
    id: "4",
    fields: [
      x1PortField,
      x3PortField
    ]
  }
];

const columnHUAWAIFields = [
	{
		id: "1",
		fields: [
			nameField,
			neIdField,
			neAddressField,
		]
	},
	{
		id: "2",
		fields: [
			typeSelect,
			usernameField,
			passwordField
		]
	},
	{
		id: "3",
		fields: [
			x1IpField,
			x2IpField,
			x3IpField,
		]
	},
	{
		id: "4",
		fields: [
			x1PortField,
			x2PortField,
			x3PortField,
		]
	}
];

let columnFields = {};
if (CLIENT_NAME === 'EricssonCs') columnFields = columnERICSSONCsFields;
if (CLIENT_NAME === 'EricssonEps') columnFields = columnERICSSONEpsFields;
if (CLIENT_NAME === 'ZteIms') columnFields = columnZTEFields;
if (CLIENT_NAME === 'HuaweiNgnFix') columnFields = columnHUAWAIFields;

export { columnFields};


