package com.example.powiki.api2db.service;

import com.example.powiki.api2db.mapper.DataIngestionMapper;
import com.example.powiki.api2db.model.TypeApiDTO;
import com.example.powiki.api2db.model.TypeEfficacyDTO;
import com.example.powiki.api2db.model.VersionApiDTO;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class DataIngestionServiceImpl implements DataIngestionService {


    private final DataIngestionMapper dataIngestionMapper;

    // SSL 무시용 HttpClient 생성기
    private final RestClient restClient = RestClient.builder()
            .requestFactory(new JdkClientHttpRequestFactory(createUnsafeHttpClient()))
            .build();
    private static HttpClient createUnsafeHttpClient() {
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

    /**
     * 버전 데이터 수집
     */
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

            // id 가져오기
            Integer id = data.get("id").asInt();

            // 버전 이름 가져오기
            String name = null;
            JsonNode names = data.get("names");
            for(JsonNode n : names) {
                if("ko".equals(n.get("language").get("name").asText())) {
                    name = n.get("name").asText();
                }
            }

            // 세대 가져오기
            JsonNode versionGroup = restClient.get()
                    .uri(data.get("version_group").get("url").asText())
                    .retrieve()
                    .body(JsonNode.class);
            String groupUrl = versionGroup.get("generation").get("url").asText();
            String[] parts = groupUrl.split("/");
            Integer generation = Integer.parseInt(parts[parts.length - 1]);

            // 지역 가져오기
            String region = null;
            JsonNode regions = versionGroup.get("regions");
            if (regions != null  && !regions.isEmpty()) {

                String regionUrl = regions.get(0).get("url").asText();
                JsonNode regionApi = restClient.get()
                        .uri(regionUrl)
                        .retrieve()
                        .body(JsonNode.class);

                JsonNode regionNames = regionApi.get("names");
                for (JsonNode r : regionNames) {
                    if ("ko".equals(r.get("language").get("name").asText())) {
                        region = r.get("name").asText();
                        break;
                    }
                }
            }

            VersionApiDTO versionApi = VersionApiDTO.builder().id(id).name(name).region(region).generation(generation).build();
            log.debug("### versionApi : {}", versionApi);
            dataIngestionMapper.insertVersion(versionApi);
        }
    }

    /**
     *  타입 데이터 수집
     */
    @Override
    public void processTypeIngestion() {

        JsonNode countResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/type")
                .retrieve()
                .body(JsonNode.class);

        int count = countResponse.get("count").asInt();
        JsonNode totalResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/type?limit=" + count)
                .retrieve()
                .body(JsonNode.class);

        for(JsonNode type : totalResponse.get("results")) {
            JsonNode response = restClient.get()
                    .uri(type.get("url").asText())
                    .retrieve()
                    .body(JsonNode.class);

            // id
            Integer id = response.get("id").asInt();

            //generation
            String[] generationUrl = response.get("generation").get("url").asText().split("/");
            Integer generation = Integer.parseInt(generationUrl[generationUrl.length - 1]);

            // name
            String name = null;

            JsonNode typeNames = response.get("names");
            for(JsonNode typeName : typeNames) {
                if("ko".equals(typeName.get("language").get("name").asText())) {
                    name = typeName.get("name").asText();
                    break;
                }
            }

            // sprite
            String sprite = response.get("sprites").get("generation-ix").get("scarlet-violet").get("symbol_icon").asText();

            // 타입 저장
            TypeApiDTO typeApi = TypeApiDTO.builder().generation(generation).id(id).name(name).sprite(sprite).build();
            log.debug("### typeApi: {}", typeApi);
            dataIngestionMapper.insertType(typeApi);

            // 타입 상성 저장
            JsonNode damageRelations = response.get("damage_relations");

            processTypeEfficacy(id, damageRelations.get("double_damage_from"), 2.0, true);
            processTypeEfficacy(id, damageRelations.get("double_damage_to"), 2.0, false);
            processTypeEfficacy(id, damageRelations.get("half_damage_from"), 0.5, true);
            processTypeEfficacy(id, damageRelations.get("half_damage_to"), 0.5, false);
            processTypeEfficacy(id, damageRelations.get("no_damage_from"), 0, true);
            processTypeEfficacy(id, damageRelations.get("no_damage_to"), 0, false);

        }
    }

    @Override
    public void processEggGroupIngestion() {

        JsonNode totalResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/egg-group")
                .retrieve()
                .body(JsonNode.class);

        for(JsonNode node : totalResponse.get("results")) {
            JsonNode response = restClient.get()
                    .uri(node.get("url").asText())
                    .retrieve()
                    .body(JsonNode.class);

            Integer id = response.get("id").asInt();

            String name = null;
            JsonNode names = response.get("names");
            for(JsonNode n : names) {
                if("ko".equals(n.get("language").get("name").asText())) {
                    name = n.get("name").asText();
                    break;
                }
            }

            dataIngestionMapper.insertEggGroup(id, name);
        }
    }

    @Override
    public void processPokemonIngestion() {

    }

    /**
     * 타입 상성 저장
     */
    private void processTypeEfficacy(Integer typeId, JsonNode relationsNode, double damageFactor, boolean isFrom) {

        for(JsonNode node : relationsNode) {
            String[] urlParts = node.get("url").asText().split("/");
            Integer otherTypeId = Integer.parseInt(urlParts[urlParts.length-1]);

            TypeEfficacyDTO typeEfficacy;
            if(isFrom) {
                typeEfficacy = TypeEfficacyDTO.builder().targetTypeId(typeId).damageTypeId(otherTypeId).damageFactor(damageFactor).build();
            } else {
                typeEfficacy = TypeEfficacyDTO.builder().targetTypeId(otherTypeId).damageTypeId(typeId).damageFactor(damageFactor).build();
            }

            dataIngestionMapper.insertTypeEfficacy(typeEfficacy);
        }
    }
}
