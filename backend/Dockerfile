# ベースイメージの指定
FROM openjdk:17-jdk-slim

# 作業ディレクトリの設定
WORKDIR /app

# ビルドアーティファクトのコピー
COPY target/bulletinboard-0.0.1-SNAPSHOT.jar app.jar

# アプリケーションの実行
ENTRYPOINT ["java", "-jar", "app.jar"]