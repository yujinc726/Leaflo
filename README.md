# Leaflo - 낙엽을 에너지로 🍃

낙엽 폐기물을 바이오매스 팰릿으로 전환하는 친환경 창업 서비스의 공식 웹사이트입니다.

## 🌟 주요 특징

- **3가지 수익 모델**: B2B/B2C 펠릿 판매, 지자체 위탁계약, ESG 탄소저감 크레딧
- **실제 사업 데이터**: 구체적인 가격, 손익분기점, 수익률 정보 제공
- **현대적인 UI/UX**: Next.js, Tailwind CSS, Framer Motion을 활용한 반응형 디자인
- **SEO 최적화**: 검색 엔진 최적화 및 메타 태그 설정

## 🚀 로컬 개발 환경 설정

### 필수 요구사항
- Node.js 18+ 
- npm 또는 pnpm

### 설치 및 실행
```bash
# 의존성 설치
npm install
# 또는
pnpm install

# 개발 서버 실행
npm run dev
# 또는
pnpm dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 🌐 EC2 Ubuntu 배포 가이드

### 1. EC2 인스턴스 준비

#### EC2 인스턴스 생성
- **운영체제**: Ubuntu 22.04 LTS
- **인스턴스 타입**: t3.micro 이상 (메모리 1GB+)
- **보안 그룹**: HTTP(80), HTTPS(443), SSH(22) 포트 오픈

#### SSH 접속
```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### 2. 서버 환경 설정

#### 시스템 업데이트
```bash
sudo apt update
sudo apt upgrade -y
```

#### Node.js 설치
```bash
# NodeSource 저장소 추가
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Node.js 설치
sudo apt-get install -y nodejs

# 설치 확인
node --version
npm --version
```

#### PM2 설치 (프로세스 매니저)
```bash
sudo npm install -g pm2
```

#### Nginx 설치
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3. 애플리케이션 배포

#### 소스 코드 배포
```bash
# Git 클론 (GitHub/GitLab 사용 시)
git clone https://github.com/your-username/leaflo.git
cd leaflo

# 또는 파일 업로드 (scp 사용 시)
# scp -i your-key.pem -r ./leaflo ubuntu@your-ec2-ip:/home/ubuntu/
```

#### 의존성 설치 및 빌드
```bash
npm install
npm run build
```

#### PM2로 애플리케이션 실행
```bash
# PM2 설정 파일 생성
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'leaflo',
    script: 'npm',
    args: 'start',
    cwd: '/home/ubuntu/leaflo',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# 애플리케이션 시작
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Nginx 리버스 프록시 설정

#### Nginx 설정 파일 생성
```bash
sudo cat > /etc/nginx/sites-available/leaflo << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # 실제 도메인으로 변경
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# 설정 활성화
sudo ln -s /etc/nginx/sites-available/leaflo /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Nginx 테스트 및 재시작
sudo nginx -t
sudo systemctl restart nginx
```

### 5. SSL 인증서 설정 (Let's Encrypt)

#### Certbot 설치
```bash
sudo apt install certbot python3-certbot-nginx -y
```

#### SSL 인증서 발급
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 6. 방화벽 설정
```bash
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 7. 자동 배포 스크립트 (선택사항)

#### 배포 자동화 스크립트 생성
```bash
cat > deploy.sh << 'EOF'
#!/bin/bash

echo "🚀 Leaflo 배포 시작..."

# Git에서 최신 코드 가져오기
git pull origin main

# 의존성 설치
npm ci

# 빌드
npm run build

# PM2 재시작
pm2 restart leaflo

echo "✅ 배포 완료!"
EOF

chmod +x deploy.sh
```

## 📊 사업 모델 개요

### A. 낙엽 펠릿 제품 판매
- **B2B**: 373원/kg, 21-30톤에서 손익분기점
- **B2C**: 600-870원/kg, 캠핑·난로·고양이모래 용도

### B. 지자체 위탁계약 (B2G)
- 지자체 처리비용 30-50만원/톤 절감
- 이중 수익 구조: 위탁비 + 펠릿 판매

### C. ESG·탄소저감 크레딧
- 현재 탄소배출권 1만원/톤
- 미래 성장 가능성 높음

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: PM2, Nginx, Let's Encrypt

## 📝 주요 페이지

- **홈페이지**: 서비스 소개 및 3가지 수익 모델 개요
- **회사소개**: Leaflo의 미션, 팀 소개, 생산 과정
- **비즈니스**: 상세 수익 모델 및 구체적 수치
- **문의하기**: 비즈니스 문의, 온라인 스토어, 투자 제안서

## 🔧 유지보수

### 로그 확인
```bash
# PM2 로그
pm2 logs leaflo

# Nginx 로그
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 업데이트 배포
```bash
# 배포 스크립트 실행
./deploy.sh
```

### 모니터링
```bash
# PM2 상태 확인
pm2 status

# 서버 리소스 확인
htop
df -h
```

## 📞 지원

기술적 문제나 배포 관련 문의사항이 있으시면 언제든 연락주세요.

---

**Leaflo** - 낙엽이 에너지가 되는 혁신적인 순간 🌱 