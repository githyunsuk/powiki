package com.example.powiki.api2db.service;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.net.http.HttpClient;

@Service
@Slf4j
public class DataIngestionServiceImpl implements DataIngestionService {

    private final RestClient restClient;

    public DataIngestionServiceImpl() {
        this.restClient = RestClient.builder()
                .requestFactory(new JdkClientHttpRequestFactory(createUnsafeHttpClient()))
                .build();
    }

    // SSL 무시용 HttpClient 생성기
    private HttpClient createUnsafeHttpClient() {
        try {
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, new TrustManager[]{new X509TrustManager() {
                public void checkClientTrusted(java.security.cert.X509Certificate[] c, String a) {}
                public void checkServerTrusted(java.security.cert.X509Certificate[] c, String a) {}
                public java.security.cert.X509Certificate[] getAcceptedIssuers() { return null; }
            }}, new java.security.SecureRandom());

            return HttpClient.newBuilder().sslContext(sslContext).build();
        } catch (Exception e) {
            throw new RuntimeException("SSL 설정 실패", e);
        }
    }
    @Override
    public void processVersionIngestion() {

        JsonNode root = restClient.get()
                .uri("https://pokeapi.co/api/v2/version")
                .retrieve()
                .body(JsonNode.class);

        int count = root.get("count").asInt();

        for(int i = 1; i <= count; i++) {
            JsonNode data = restClient.get()
                    .uri("https://pokeapi.co/api/v2/version/" + i)
                    .retrieve()
                    .body(JsonNode.class);

            Integer id = data.get("id").asInt();

            String name = null;
            JsonNode names = data.get("names");
            for(JsonNode n : names) {
                if("ko".equals(n.get("language").get("name").asText())) {
                    name = n.get("name").asText();
                }
            }

            JsonNode versionGroup = resetClient.get()
                    .uri(data.get("version_group").get("url").asText())
                    .retrieve()
                    .body(JsonNode.class);
            String groupUrl = versionGroup.get("generation").get("url").asText();
            String[] parts = groupUrl.split("/");
            Integer generation = Integer.parseInt(parts[parts.length - 1]);

            String region = null;
        }
    }
}
