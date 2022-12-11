import { CLIENT_NAME } from '@/http/config';

export default function getVendorName() {
    let name = '';
    // Задаём имена продукта
    if (CLIENT_NAME === 'EricssonCs') name = 'Ericsson CS LIG';
    if (CLIENT_NAME === 'EricssonEps') name = 'Ericsson Eps LIG';
    if (CLIENT_NAME === 'ZteIms') name = 'ZTE IMS LIG';
    if (CLIENT_NAME === 'HuaweiNgnFix') name = 'Huawei Ngn Fix LIG';
    return name
}
