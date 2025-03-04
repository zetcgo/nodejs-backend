import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import common from './common';
import local from './local';
import development from './development';
import production from './production';

export type YamlConfig = {
    http: { port: number };
    redis: { host: string; port: number };
};

export type Config = {
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    apiVersion: string;
    dbInfo: string;
    MESSAGE: string;
} & YamlConfig;

const yamlConfig = yaml.load(
    readFileSync(`${process.cwd()}/src/envs/config.yaml`, 'utf-8'),
) as YamlConfig;

export default () =>
    ({
        ...common,
        ...{ local, development, production }[process.env.NODE_ENV],
        ...yamlConfig,
    }) as Config;
