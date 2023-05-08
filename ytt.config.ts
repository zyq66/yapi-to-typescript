import { defineConfig } from 'yapi-to-typescript';

/**
 * 生成Api接口名称  Interface和ChangeCase数据类型参见node_modules\yapi-to-typescript\lib\esm\index.d.ts定义
 * @param interfaceInfo : Interface
 * @param changeCase:ChangeCase
 * @returns 请求响应接口名称--pascal命名
 */
function genApiInterfaceName(interfaceInfo, changeCase) {
  const lastPath = interfaceInfo.parsedPath.dir.split('/').pop();
  return `${changeCase.pascalCase(lastPath)}${changeCase.pascalCase(interfaceInfo.parsedPath.name)}`;
}

export default defineConfig([
  {
    serverUrl: 'http://api.hljnbw.cn/',//yapi首页地址
    typesOnly: true,
    target: 'typescript',
    reactHooks: {
      enabled: false,
    },
    prodEnvName: '', //项目名称
    outputFilePath: (interfaceInfo, changeCase) => {
      const filePathArr = interfaceInfo.path.split('/').slice(-2);
      const filePath = filePathArr.map((item) => changeCase.camelCase(item)).join('/');
      return `app/pages/${filePath}.ts`; //生成文件位置
    },
    getRequestDataTypeName: (interfaceInfo, changeCase) => {
      return `${genApiInterfaceName(interfaceInfo, changeCase)}Request`;
    },
    getResponseDataTypeName: (interfaceInfo, changeCase) => {
      return `${genApiInterfaceName(interfaceInfo, changeCase)}Response`;
    },
    dataKey: 'data',
    projects: [
      {
        token: '',
        categories: [
          {
            id: [],//可选择接口组下id或单个接口id  如为0则生成全部接口文件
          },
        ],
      },
    ],
  },
]);