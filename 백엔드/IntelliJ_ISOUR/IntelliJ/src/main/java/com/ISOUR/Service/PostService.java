package com.ISOUR.Service;

import com.ISOUR.Entity.MemberInfo;
import com.ISOUR.Entity.Postbox;
import com.ISOUR.dto.PostDTO;
import com.ISOUR.repository.PostboxRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
public class PostService {
    private PostboxRepository postboxRepository;
    public PostService(PostboxRepository postboxRepository) {
        this.postboxRepository = postboxRepository;
    }

    /* 쪽지함 조회 서비스 */
    public List<PostDTO> getPostList(String id) {
        log.warn("★★★★★★★★★쪽지함 조회 서비스★★★★★★★★★");
        log.warn("받는 사람(id) : " + id);

        List<PostDTO> postDTOS = new ArrayList<>();
        List<Postbox> postboxList = postboxRepository.findByPostReceiver(id);
        log.warn(">> 쪽지함 조회 서비스 로 돌아왔습니다.");

        for(Postbox e : postboxList) {
            PostDTO postDTO = new PostDTO();
            postDTO.setPostNum(e.getPostNum());
            postDTO.setPostSender(e.getPostSender());
            postDTO.setContent(e.getContent());
            postDTO.setPostTime(e.getPostTime());

            postDTOS.add(postDTO);
        }

        return postDTOS;
    }

    /* 쪽지 보내기 서비스 */
    public boolean sendPost(String id, String receiverId, String content) {
        log.warn("★★★★★★★★★쪽지 보내기 서비스★★★★★★★★★");
        log.warn("보내는 사람(id) : " + id);
        log.warn("받는 사람(receiverId) : " + receiverId);
        log.warn("내용(content) : " + content);

        Postbox postbox = new Postbox();
        postbox.setPostSender(id);
        postbox.setPostReceiver(receiverId);
        postbox.setContent(content);
        postbox.setPostTime(LocalDate.now());

        Postbox result = postboxRepository.save(postbox);
        log.warn(result.toString());

        return true;
    }

    /* 쪽지 삭제 서비스 */
    public boolean deleteMember(ArrayList<Long> postNumArray) {
        log.warn("★★★★★★★★★쪽지 삭제 서비스★★★★★★★★★");
        log.warn("삭제할 쪽지 번호(postNum) : " + postNumArray);

        List<Postbox> postDeleteList = new ArrayList<>();
        for(int i = 0; i < postNumArray.size(); i++) {
            long deleteNum = postNumArray.get(i);
            Postbox postbox = postboxRepository.findByPostNum(deleteNum);
            postDeleteList.add(postbox);

            log.warn("postDeleteList 에 추가 : \n>>" + postDeleteList.toString());
        }

        
        if(postDeleteList.size() > 0) {
            log.warn(">> 삭제 : " + postDeleteList);
            postboxRepository.deleteAll(postDeleteList);
            log.warn(">> 쪽지 삭제 Controller 로 돌아갑니다.");
            return true;
        } else return false;
    }
}
