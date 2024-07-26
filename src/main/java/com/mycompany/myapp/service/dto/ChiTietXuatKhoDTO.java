package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.ChiTietXuatKho;
import java.util.List;

public class ChiTietXuatKhoDTO {

    private String type;
    private Long id;
    private Integer numberOfUpdate;
    private String timeUpdate;
    private String user;
    private List<ChiTietXuatKho> chiTietXuatKho;

    public ChiTietXuatKhoDTO(String type, Long id, Integer numberOfUpdate, String timeUpdate, List<ChiTietXuatKho> chiTietXuatKho) {
        this.type = type;
        this.id = id;
        this.numberOfUpdate = numberOfUpdate;
        this.timeUpdate = timeUpdate;
        this.chiTietXuatKho = chiTietXuatKho;
    }

    public ChiTietXuatKhoDTO() {}

    public void setUser(String user) {
        this.user = user;
    }

    public String getUser() {
        return user;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumberOfUpdate() {
        return numberOfUpdate;
    }

    public void setNumberOfUpdate(Integer numberOfUpdate) {
        this.numberOfUpdate = numberOfUpdate;
    }

    public String getTimeUpdate() {
        return timeUpdate;
    }

    public void setTimeUpdate(String timeUpdate) {
        this.timeUpdate = timeUpdate;
    }

    public List<ChiTietXuatKho> getChiTietXuatKho() {
        return chiTietXuatKho;
    }

    public void setChiTietXuatKho(List<ChiTietXuatKho> chiTietXuatKho) {
        this.chiTietXuatKho = chiTietXuatKho;
    }
}
