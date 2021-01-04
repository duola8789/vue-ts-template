#!/usr/bin/env bash

# 保证你的 build.sh 脚本有任何错误就退出
set -e

# 保证你的字符集正确，如果是英文写 en_US.UTF-8，如果是中文写 zh_CN.UTF-8
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8

# 添加下一行保证能够找到正确的 Node 和 npm，以及 yarn 命令。
export PATH=$NODEJS_BIN_LATEST:$YARN_BIN_LATEST:$PATH

# 添加下一行保证能够找到你使用 yarn install 安装的工具
export PATH=$(yarn bin):$PATH

echo "----- build start------"

# 编译日志中打印 Node、npm和 yarn 的版本。
echo "node: $(node -v)"
echo "npm: v$(npm -v)"
echo "yarn: v$(yarn -v)"

# 安装依赖
yarn install

# 区分环境进行构建
build_command="build"

# 是否打包 Nginx 相关配置
package_nginx_conf=false

case "$1" in
    'dev')
        build_command="build-dev"
        ;;
    'staging')
        build_command="build-staging"
        ;;
    'testing')
        build_command="build-testing"
        ;;
    'pre')
        build_command="build-pre"
        package_nginx_conf=true
        ;;
    *)
        build_command="build"
        package_nginx_conf=true
        ;;
esac

# 编译日志中打印执行的编译命令
echo "build_command: $build_command"

yarn ${build_command}

# output 是编译机群的约定，必须是 output，否则会导致产品库拉取的目录是空的。
# 详见：http://buildcloud.baidu.com/bcloud/10-bcloud_output
mkdir output

# 复制 dist 目录下的产出到 output 目录下
cp -rf dist/* output/

# 线上环境，复制前端对应的 nginx 配置文件和部署脚本到 output/conf 目录下
if [ "$package_nginx_conf" = true ]
then
    # 复制前端部署脚本到 output/bin 目录下
    mkdir -p output/bin
    cp -rf bin/* output/bin/

    mkdir -p output/conf
    cp -rf conf/* output/conf/

    mkdir -p output/spec
    cp -rf spec/* output/spec/

    mkdir -p output/noahdes
    cp -rf noahdes/* output/noahdes/

    mkdir -p output/log
    cp -rf log/* output/log
fi

echo "----- build end------"
