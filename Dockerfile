# 使用官方 Node 镜像（包含完整环境）
FROM node:20.18.1

# 设置工作目录
WORKDIR /app

# 先复制包文件（利用Docker缓存层）
COPY .env .env
COPY package*.json ./

# 安装依赖
RUN npm install --legacy-peer-deps

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 暴露端口（与你的 NestJS 配置一致）
EXPOSE 3000

# 直接运行生产模式
CMD ["npm", "run", "start"]
